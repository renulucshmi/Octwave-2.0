
// Replace this with your Google Sheet ID
const SHEET_ID = '1loxdRJBK3x0HUBLd6esWm3BgLQGxkNqFgrh6vrJB4UA';
const SHEET_NAME = 'participants';


// Initialize the sheet structure
function initializeSheet() {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
  
  if (!sheet) {
    // Create the sheet if it doesn't exist
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    const newSheet = spreadsheet.insertSheet(SHEET_NAME);
    
    // Set up headers
    const headers = [
      'Team ID', 'Team Name', 'Email', 'University', 'Timestamp', 'Team Size',
      'Member 1 Name', 'Member 1 Email', 'Member 1 Phone', 'Member 1 Year', 'Member 1 IEEE', 'Member 1 Kaggle',
      'Member 2 Name', 'Member 2 Email', 'Member 2 Phone', 'Member 2 Year', 'Member 2 IEEE', 'Member 2 Kaggle',
      'Member 3 Name', 'Member 3 Email', 'Member 3 Phone', 'Member 3 Year', 'Member 3 IEEE', 'Member 3 Kaggle',
      'Member 4 Name', 'Member 4 Email', 'Member 4 Phone', 'Member 4 Year', 'Member 4 IEEE', 'Member 4 Kaggle'
    ];
    
    newSheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    newSheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    newSheet.setFrozenRows(1);
    
    return newSheet;
  }
  
  return sheet;
}

// Main function to handle web app requests
function doPost(e) {
  try {
    // Handle both JSON and form data
    let requestData;
    
    if (e.postData && e.postData.contents) {
      // JSON data from API
      requestData = JSON.parse(e.postData.contents);
    } else if (e.parameter) {
      // Form data from frontend
      requestData = {
        action: e.parameter.action,
        data: {
          teamName: e.parameter.teamName,
          email: e.parameter.email,
          university: e.parameter.university,
          members: JSON.parse(e.parameter.members || '[]'),
          timestamp: new Date().toISOString()
        }
      };
    } else {
      throw new Error('No data received');
    }
    
    switch (requestData.action) {
      case 'registerTeam':
        return registerTeam(requestData.data);
      default:
        return ContentService
          .createTextOutput(JSON.stringify({ success: false, error: 'Invalid action' }))
          .setMimeType(ContentService.MimeType.JSON);
    }
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        error: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  try {
    const action = e.parameter.action;
    
    switch (action) {
      case 'getAllRegistrations':
        return getAllRegistrations();
      case 'getStats':
        return getStats();
      default:
        return ContentService
          .createTextOutput(JSON.stringify({ success: false, error: 'Invalid action' }))
          .setMimeType(ContentService.MimeType.JSON);
    }
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        error: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function registerTeam(data) {
  try {
    const sheet = initializeSheet();
    
    // Generate incremental team ID
    const lastRow = sheet.getLastRow();
    // Row 1 = headers, so if lastRow = 1 (only headers), next team = OW_1
    // If lastRow = 2 (1 team exists), next team = OW_2, etc.
    const teamCounter = lastRow; // This gives us the correct next team number
    const teamId = `OW_${teamCounter}`;
    
    // Prepare row data
    const rowData = [
      teamId,
      data.teamName,
      data.email,
      data.university,
      data.timestamp || new Date().toISOString(),
      data.members.length // Team size
    ];
    
    // Add member data (up to 4 members, flexible for 1-4 members)
    for (let i = 0; i < 4; i++) {
      const member = data.members[i];
      if (member) {
        rowData.push(
          member.fullName || '',
          member.email || '',
          member.phone || '',
          member.yearOfStudy || '',
          member.ieeeNumber || '',
          member.kaggleId || ''
        );
      } else {
        // Empty cells for missing members
        rowData.push('', '', '', '', '', '');
      }
    }
    
    // Add the new row
    sheet.appendRow(rowData);
    
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: true, 
        teamId: teamId 
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        error: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getAllRegistrations() {
  try {
    const sheet = initializeSheet();
    const data = sheet.getDataRange().getValues();
    
    if (data.length <= 1) {
      return ContentService
        .createTextOutput(JSON.stringify({ 
          success: true, 
          data: [] 
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    const headers = data[0];
    const registrations = [];
    
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      
      // Extract members (up to 4 members)
      const members = [];
      for (let j = 0; j < 4; j++) {
        const baseIndex = 6 + (j * 6); // Starting from column G (index 6) since we added Team Size
        if (row[baseIndex] && row[baseIndex].trim() !== '') {
          members.push({
            fullName: row[baseIndex] || '',
            email: row[baseIndex + 1] || '',
            phone: row[baseIndex + 2] || '',
            yearOfStudy: row[baseIndex + 3] || '',
            ieeeNumber: row[baseIndex + 4] || '',
            kaggleId: row[baseIndex + 5] || ''
          });
        }
      }
      
      registrations.push({
        teamId: row[0],
        teamName: row[1],
        email: row[2],
        university: row[3],
        timestamp: row[4],
        teamSize: row[5],
        members: members
      });
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: true, 
        data: registrations 
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        error: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getStats() {
  try {
    const sheet = initializeSheet();
    const data = sheet.getDataRange().getValues();
    
    if (data.length <= 1) {
      return ContentService
        .createTextOutput(JSON.stringify({ 
          success: true, 
          stats: {
            totalRegistrations: 0,
            totalParticipants: 0,
            universitiesCount: 0,
            avgTeamSize: "0",
            nextTeamId: "OW_1",
            universities: []
          }
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    const registrations = data.slice(1); // Remove headers
    const totalRegistrations = registrations.length;
    let totalParticipants = 0;
    const universitiesSet = new Set();
    const universityCounts = {};
    
    registrations.forEach(row => {
      const university = row[3];
      universitiesSet.add(university);
      universityCounts[university] = (universityCounts[university] || 0) + 1;
      
      // Use the team size from the sheet (column 5, index 5)
      const teamSize = parseInt(row[5]) || 0;
      totalParticipants += teamSize;
    });
    
    const avgTeamSize = totalRegistrations > 0 ? 
      (totalParticipants / totalRegistrations).toFixed(1) : "0";
    
    const universities = Object.entries(universityCounts).map(([name, count]) => ({
      name,
      count
    }));
    
    const nextTeamId = `OW_${totalRegistrations + 1}`;
    
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: true, 
        stats: {
          totalRegistrations,
          totalParticipants,
          universitiesCount: universitiesSet.size,
          avgTeamSize,
          nextTeamId,
          universities
        }
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        error: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

