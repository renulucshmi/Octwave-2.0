import { NextRequest, NextResponse } from 'next/server';
import { redis } from '@/lib/redis';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    const client = await redis.getClient();

    switch (action) {
      case 'stats':
        return await getDetailedStats(client);
      
      case 'universities':
        return await getUniversityBreakdown(client);
      
      case 'export-all':
        return await getAllRegistrationsForExport(client);
      
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

  } catch (error) {
    console.error('Admin API error:', error);
    return NextResponse.json(
      { error: 'Failed to process admin request' },
      { status: 500 }
    );
  }
}

async function getDetailedStats(client: any) {
  const allTeamIds = await client.lRange('registrations:all', 0, -1);
  const registrations = [];

  for (const id of allTeamIds) {
    const registration = await client.hGetAll(`registration:${id}`);
    if (Object.keys(registration).length > 0) {
      registration.teamMembers = JSON.parse(registration.teamMembers || '[]');
      registrations.push(registration);
    }
  }

  // Calculate detailed statistics
  const stats = {
    totalTeams: registrations.length,
    totalParticipants: registrations.reduce((sum, reg) => sum + reg.teamMembers.length, 0),
    universities: {} as Record<string, { teams: number; participants: number }>,
    yearDistribution: {} as Record<string, number>,
    registrationsByDate: {} as Record<string, number>,
    teamSizeDistribution: { 1: 0, 2: 0, 3: 0, 4: 0 } as Record<number, number>,
    ieeeMembers: 0,
    kaggleUsers: 0
  };

  registrations.forEach((reg: any) => {
    // University stats
    const uni = reg.university;
    if (!stats.universities[uni]) {
      stats.universities[uni] = { teams: 0, participants: 0 };
    }
    stats.universities[uni].teams++;
    stats.universities[uni].participants += reg.teamMembers.length;

    // Team size distribution
    const teamSize = reg.teamMembers.length;
    if (teamSize >= 1 && teamSize <= 4) {
      stats.teamSizeDistribution[teamSize as keyof typeof stats.teamSizeDistribution]++;
    }

    // Registration date
    const date = new Date(reg.registrationDate).toDateString();
    stats.registrationsByDate[date] = (stats.registrationsByDate[date] || 0) + 1;

    // Member details
    reg.teamMembers.forEach((member: any) => {
      // Year distribution
      const year = member.yearOfStudy;
      stats.yearDistribution[year] = (stats.yearDistribution[year] || 0) + 1;

      // IEEE membership
      if (member.ieeeNumber && member.ieeeNumber.trim()) {
        stats.ieeeMembers++;
      }

      // Kaggle users
      if (member.kaggleId && member.kaggleId.trim()) {
        stats.kaggleUsers++;
      }
    });
  });

  return NextResponse.json({ stats });
}

async function getUniversityBreakdown(client: any) {
  const allTeamIds = await client.lRange('registrations:all', 0, -1);
  const universityData: Record<string, {
    teams: any[];
    totalParticipants: number;
    yearBreakdown: Record<string, number>;
  }> = {};

  for (const id of allTeamIds) {
    const registration = await client.hGetAll(`registration:${id}`);
    if (Object.keys(registration).length > 0) {
      const uni = registration.university;
      const teamMembers = JSON.parse(registration.teamMembers || '[]');
      
      if (!universityData[uni]) {
        universityData[uni] = {
          teams: [],
          totalParticipants: 0,
          yearBreakdown: {}
        };
      }

      universityData[uni].teams.push({
        id: registration.id,
        teamName: registration.teamName,
        contactEmail: registration.contactEmail,
        memberCount: teamMembers.length,
        registrationDate: registration.registrationDate
      });

      universityData[uni].totalParticipants += teamMembers.length;

      // Year breakdown for this university
      teamMembers.forEach((member: any) => {
        const year = member.yearOfStudy;
        universityData[uni].yearBreakdown[year] = (universityData[uni].yearBreakdown[year] || 0) + 1;
      });
    }
  }

  return NextResponse.json({ universityData });
}

async function getAllRegistrationsForExport(client: any) {
  const allTeamIds = await client.lRange('registrations:all', 0, -1);
  const registrations = [];

  for (const id of allTeamIds) {
    const registration = await client.hGetAll(`registration:${id}`);
    if (Object.keys(registration).length > 0) {
      registration.teamMembers = JSON.parse(registration.teamMembers || '[]');
      registrations.push(registration);
    }
  }

  // Sort by registration date (newest first)
  registrations.sort((a: any, b: any) => {
    const dateA = new Date(b.registrationDate).getTime();
    const dateB = new Date(a.registrationDate).getTime();
    return dateA - dateB;
  });

  return NextResponse.json({ 
    registrations,
    exportedAt: new Date().toISOString(),
    totalCount: registrations.length 
  });
}
