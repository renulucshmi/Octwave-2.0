import { NextRequest, NextResponse } from 'next/server';
import { redis } from '@/lib/redis';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.email || !body.teamName || !body.university || !body.members) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate members data
    if (!Array.isArray(body.members) || body.members.length === 0) {
      return NextResponse.json(
        { error: 'At least one team member is required' },
        { status: 400 }
      );
    }

    // Validate each member has required fields
    for (const member of body.members) {
      if (!member.fullName || !member.email || !member.phone || !member.yearOfStudy) {
        return NextResponse.json(
          { error: 'All team members must have name, email, phone, and year of study' },
          { status: 400 }
        );
      }
    }

    // Generate sequential team ID
    const client = await redis.getClient();
    
    // Get the current counter and increment it
    const teamCounter = await client.incr('team:counter');
    let teamId = `OW_${teamCounter}`;
    
    // Check if this ID already exists (shouldn't happen, but safety check)
    const existingTeam = await client.hGetAll(`registration:${teamId}`);
    if (Object.keys(existingTeam).length > 0) {
      // If somehow exists, try with a timestamp suffix
      const fallbackId = `OW_${teamCounter}_${Date.now()}`;
      console.warn(`Team ID ${teamId} already exists, using fallback: ${fallbackId}`);
      teamId = fallbackId;
    }

    // Prepare registration data
    const registrationData = {
      id: teamId,
      teamName: body.teamName,
      university: body.university,
      contactEmail: body.email,
      teamMembers: JSON.stringify(body.members), // Serialize array to string
      registrationDate: new Date().toISOString(),
      status: 'registered'
    };

    // Save to Redis with multiple keys for different access patterns
    
    // 1. Main registration data - store each field separately in hash
    await client.hSet(`registration:${teamId}`, {
      id: teamId,
      teamName: body.teamName,
      university: body.university,
      contactEmail: body.email,
      teamMembers: JSON.stringify(body.members),
      registrationDate: new Date().toISOString(),
      status: 'registered'
    });
    
    // 2. Add to university index
    await client.sAdd(`university:${body.university.replace(/\s+/g, '_')}`, teamId);
    
    // 3. Add to email index (for duplicate checking)
    await client.set(`email:${body.email}`, teamId);
    
    // 4. Add to all registrations list
    await client.lPush('registrations:all', teamId);
    
    // 5. Add member emails to prevent duplicate registrations
    for (const member of body.members) {
      await client.set(`member_email:${member.email}`, teamId);
    }

    // 6. Set expiration for session data (optional - 30 days)
    await client.expire(`registration:${teamId}`, 30 * 24 * 60 * 60);

    console.log(`Team registered successfully: ${teamId}`);

    return NextResponse.json(
      { 
        success: true, 
        teamId,
        message: 'Registration successful!',
        data: {
          teamName: body.teamName,
          university: body.university,
          memberCount: body.members.length
        }
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Registration error:', error);
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: 'Failed to process registration. Please try again.'
      },
      { status: 500 }
    );
  }
}

// GET method to retrieve registration data (for admin purposes)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const teamId = searchParams.get('teamId');
    const email = searchParams.get('email');

    const client = await redis.getClient();

    if (teamId) {
      // Get specific team registration
      const registration = await client.hGetAll(`registration:${teamId}`);
      
      if (Object.keys(registration).length === 0) {
        return NextResponse.json(
          { error: 'Registration not found' },
          { status: 404 }
        );
      }

      // Parse teamMembers back to object
      if (registration.teamMembers) {
        try {
          registration.teamMembers = JSON.parse(registration.teamMembers);
        } catch (e) {
          console.error('Error parsing team members:', e);
        }
      }

      return NextResponse.json({ registration });
    }

    if (email) {
      // Check if email is already registered
      const existingTeamId = await client.get(`email:${email}`);
      
      return NextResponse.json({ 
        exists: !!existingTeamId,
        teamId: existingTeamId 
      });
    }

    // Get all registrations (admin only - you might want to add auth here)
    const allTeamIds = await client.lRange('registrations:all', 0, -1);
    const registrations = [];

    for (const id of allTeamIds) {
      const registration = await client.hGetAll(`registration:${id}`);
      if (Object.keys(registration).length > 0) {
        // Parse teamMembers back to object
        if (registration.teamMembers) {
          try {
            registration.teamMembers = JSON.parse(registration.teamMembers);
          } catch (e) {
            console.error('Error parsing team members for registration:', id, e);
          }
        }
        registrations.push(registration);
      }
    }

    return NextResponse.json({ registrations, count: registrations.length });

  } catch (error) {
    console.error('Error fetching registrations:', error);
    
    return NextResponse.json(
      { error: 'Failed to fetch registration data' },
      { status: 500 }
    );
  }
}
