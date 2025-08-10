import { NextRequest, NextResponse } from 'next/server';
import { googleSheets } from '@/lib/googleSheets';

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

    // Register team using Google Sheets
    const result = await googleSheets.registerTeam({
      teamName: body.teamName,
      email: body.email,
      university: body.university,
      members: body.members
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to register team' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      teamId: result.teamId,
      message: 'Registration successful!',
      data: {
        teamName: body.teamName,
        university: body.university,
        memberCount: body.members.length
      }
    }, { status: 201 });

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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const teamId = searchParams.get('teamId');
    const email = searchParams.get('email');

    if (teamId || email) {
      // For specific queries, get all data and filter
      const result = await googleSheets.getAllRegistrations();
      
      if (!result.success) {
        return NextResponse.json(
          { error: result.error || 'Failed to fetch registrations' },
          { status: 500 }
        );
      }

      const registrations = result.data || [];

      if (teamId) {
        const registration = registrations.find(reg => reg.teamId === teamId);
        if (!registration) {
          return NextResponse.json(
            { error: 'Registration not found' },
            { status: 404 }
          );
        }
        return NextResponse.json({ registration });
      }

      if (email) {
        const existingTeam = registrations.find(reg => 
          reg.email === email || 
          reg.members.some(member => member.email === email)
        );
        return NextResponse.json({ 
          exists: !!existingTeam,
          teamId: existingTeam?.teamId 
        });
      }
    }

    // Get all registrations
    const result = await googleSheets.getAllRegistrations();
    
    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to fetch registrations' },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      registrations: result.data || [], 
      count: (result.data || []).length 
    });

  } catch (error) {
    console.error('Error fetching registrations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch registration data' },
      { status: 500 }
    );
  }
}
