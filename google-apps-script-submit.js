/**
 * Google Apps Script for OctWave 2.0 Submission System
 * This script handles file uploads to Google Drive and logs submissions to Google Sheets
 *
 * Setup Instructions:
 * 1. Create a new Google Apps Script project
 * 2. Replace SHEET_ID with your Google Sheets ID
 * 3. Replace DRIVE_FOLDER_ID with your Google Drive folder ID
 * 4. Deploy as a web app with "Anyone" access
 * 5. Copy the web app URL to your .env.local as GOOGLE_APPS_SCRIPT_SUBMIT_URL
 */

// ============ CONFIGURATION ============
const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID_HERE'; // Replace with your Google Sheet ID
const DRIVE_FOLDER_ID = 'YOUR_DRIVE_FOLDER_ID_HERE'; // Replace with your Google Drive folder ID
const SHEET_NAME = 'Submissions'; // Name of the sheet tab
// =======================================

/**
 * Handle POST requests for file submissions
 */
function doPost(e) {
  try {
    // Parse the request body
    const data = JSON.parse(e.postData.contents);

    // Validate required fields
    if (!data.teamId || !data.teamName || !data.leaderEmail || !data.leaderMobile) {
      return createResponse(false, 'Missing required fields');
    }

    if (!data.reportFile || !data.presentationFile) {
      return createResponse(false, 'Missing required files');
    }

    // Get or create the Google Drive folder
    const folder = DriveApp.getFolderById(DRIVE_FOLDER_ID);

    // Create a team-specific subfolder
    const teamFolderName = `${data.teamId}_${data.teamName}`;
    let teamFolder;
    const existingFolders = folder.getFoldersByName(teamFolderName);

    if (existingFolders.hasNext()) {
      teamFolder = existingFolders.next();
    } else {
      teamFolder = folder.createFolder(teamFolderName);
    }

    // Upload report file
    const reportBlob = Utilities.newBlob(
      Utilities.base64Decode(data.reportFile.data),
      data.reportFile.mimeType,
      data.reportFile.name
    );
    const reportFile = teamFolder.createFile(reportBlob);
    reportFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    const reportUrl = reportFile.getUrl();

    // Upload presentation file
    const presentationBlob = Utilities.newBlob(
      Utilities.base64Decode(data.presentationFile.data),
      data.presentationFile.mimeType,
      data.presentationFile.name
    );
    const presentationFile = teamFolder.createFile(presentationBlob);
    presentationFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    const presentationUrl = presentationFile.getUrl();

    // Log to Google Sheets
    const sheet = getOrCreateSheet();
    const timestamp = new Date();

    sheet.appendRow([
      timestamp,
      data.teamId,
      data.teamName,
      data.leaderEmail,
      data.leaderMobile,
      reportUrl,
      presentationUrl,
      teamFolder.getUrl(),
      data.reportFile.name,
      data.presentationFile.name
    ]);

    // Return success response
    return createResponse(true, 'Submission successful', {
      reportUrl: reportUrl,
      presentationUrl: presentationUrl,
      folderUrl: teamFolder.getUrl()
    });

  } catch (error) {
    Logger.log('Error in doPost: ' + error.toString());
    return createResponse(false, 'Server error: ' + error.toString());
  }
}

/**
 * Get or create the submissions sheet
 */
function getOrCreateSheet() {
  const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);

    // Create header row
    const headers = [
      'Timestamp',
      'Team ID',
      'Team Name',
      'Leader Email',
      'Leader Mobile',
      'Report URL',
      'Presentation URL',
      'Folder URL',
      'Report File Name',
      'Presentation File Name'
    ];

    sheet.appendRow(headers);

    // Format header row
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#4285f4');
    headerRange.setFontColor('#ffffff');

    // Auto-resize columns
    for (let i = 1; i <= headers.length; i++) {
      sheet.autoResizeColumn(i);
    }

    // Freeze header row
    sheet.setFrozenRows(1);
  }

  return sheet;
}

/**
 * Create a standardized JSON response
 */
function createResponse(success, message, data = {}) {
  const response = {
    success: success,
    message: message,
    ...data
  };

  if (!success) {
    response.error = message;
  }

  return ContentService
    .createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Handle GET requests (for testing)
 */
function doGet(e) {
  return createResponse(true, 'OctWave 2.0 Submission API is active', {
    version: '1.0',
    endpoint: 'POST only',
    timestamp: new Date().toISOString()
  });
}

/**
 * Test function to verify setup
 */
function testSetup() {
  try {
    // Test Sheet access
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    Logger.log('✓ Sheet access successful: ' + spreadsheet.getName());

    // Test Drive folder access
    const folder = DriveApp.getFolderById(DRIVE_FOLDER_ID);
    Logger.log('✓ Drive folder access successful: ' + folder.getName());

    // Test sheet creation
    const sheet = getOrCreateSheet();
    Logger.log('✓ Submissions sheet ready: ' + sheet.getName());

    Logger.log('✓ All setup tests passed!');
    return true;

  } catch (error) {
    Logger.log('✗ Setup test failed: ' + error.toString());
    return false;
  }
}
