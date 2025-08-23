// Google Sheets integration for OctWave registration
// This will work with a Google Apps Script web app

export interface TeamMember {
  fullName: string;
  email: string;
  phone: string;
  yearOfStudy: string;
  ieeeNumber?: string;
  kaggleId?: string;
}

export interface RegistrationData {
  teamName: string;
  email: string;
  university: string;
  members: TeamMember[];
  timestamp?: string;
  teamId?: string;
}

export interface RegistrationStats {
  totalRegistrations: number;
  totalParticipants: number;
  universitiesCount: number;
  avgTeamSize: string;
  nextTeamId: string;
  universities: Array<{
    name: string;
    count: number;
  }>;
}

export class GoogleSheetsAPI {
  private webAppUrl: string;

  constructor() {
    // You'll need to replace this with your Google Apps Script web app URL
    this.webAppUrl = process.env.GOOGLE_APPS_SCRIPT_URL || '';
    
    if (!this.webAppUrl) {
      console.error('Google Apps Script URL not configured');
    }
  }

  async registerTeam(data: RegistrationData): Promise<{ success: boolean; teamId: string; error?: string }> {
    try {
      const response = await fetch(this.webAppUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'registerTeam',
          data: {
            ...data,
            timestamp: new Date().toISOString(),
          }
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error registering team:', error);
      return {
        success: false,
        teamId: '',
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  async getAllRegistrations(): Promise<{ success: boolean; data?: RegistrationData[]; error?: string }> {
    try {
      const response = await fetch(`${this.webAppUrl}?action=getAllRegistrations`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error fetching registrations:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  async getStats(): Promise<{ success: boolean; stats?: RegistrationStats; error?: string }> {
    try {
      const response = await fetch(`${this.webAppUrl}?action=getStats`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error fetching stats:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }
}

export const googleSheets = new GoogleSheetsAPI();
