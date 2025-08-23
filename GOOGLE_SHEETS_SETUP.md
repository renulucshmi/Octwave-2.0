# Google Sheets Integration Setup Guide

## Step 1: Create Google Sheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "octwave-2.0"
4. Create a sheet called "Participants"

## Step 2: Set up Google Apps Script
1. Go to [Google Apps Script](https://script.google.com)
2. Click "New Project"
3. Replace the default code with the content from `google-apps-script.js`
4. Update the `SHEET_ID` constant in the script:
   - Get your Google Sheet ID from the URL: `https://docs.google.com/spreadsheets/d/{SHEET_ID}/edit`
   - Replace `YOUR_GOOGLE_SHEET_ID_HERE` with your actual sheet ID

## Step 3: Deploy as Web App
1. In Google Apps Script, click "Deploy" > "New deployment"
2. Choose type: "Web app"
3. Description: "OctWave Registration API"
4. Execute as: "Me"
5. Who has access: "Anyone"
6. Click "Deploy"
7. Copy the web app URL (it will look like: `https://script.google.com/macros/s/{SCRIPT_ID}/exec`)

## Step 4: Configure Next.js App
1. Create a `.env.local` file in your project root
2. Add the following line:
   ```
   GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
   ```
3. Replace `YOUR_SCRIPT_ID` with your actual script ID

## Step 5: Test the Integration
1. Start your Next.js development server: `npm run dev`
2. Go to the registration page
3. Fill out and submit a test registration
4. Check your Google Sheet to see if the data appears

## Google Sheet Structure
The sheet will automatically create the following columns:
- Team ID (OW_1, OW_2, etc.)
- Team Name
- Email
- University
- Timestamp
- Team Size
- Member details (up to 4 members with name, email, phone, year, GitHub, LinkedIn)

## Benefits of Google Sheets Integration
- ✅ Free to use
- ✅ Visual interface for data management
- ✅ Easy to export data (CSV, Excel, etc.)
- ✅ Real-time collaboration
- ✅ Built-in data validation and formatting
- ✅ No database hosting costs
- ✅ Automatic backups by Google

## Troubleshooting
- If registration fails, check the Google Apps Script logs
- Ensure the web app is deployed with "Anyone" access
- Verify the SHEET_ID in the Google Apps Script matches your sheet
- Check that the sheet name is exactly "Participants"
