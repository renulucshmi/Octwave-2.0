# OctWave 2.0 Submission System Setup Guide

This guide will help you set up the complete submission system with Google Drive file uploads and Google Sheets logging.

## 📋 Overview

The submission system allows teams to:
- Submit their Team ID, Team Name, Leader Email, and Mobile Number
- Upload Report (PDF) and Presentation (PPT/PPTX) files
- Files are automatically uploaded to Google Drive
- All submission details are logged in Google Sheets

---

## Step 1: Create Google Drive Folder

1. Go to [Google Drive](https://drive.google.com)
2. Create a new folder named "OctWave 2.0 Submissions"
3. Open the folder and copy its ID from the URL
   - URL format: `https://drive.google.com/drive/folders/{FOLDER_ID}`
   - Example: If URL is `https://drive.google.com/drive/folders/1ABC...XYZ`, the ID is `1ABC...XYZ`
4. Save this **FOLDER_ID** for later

---

## Step 2: Create Google Sheets for Submissions

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "OctWave 2.0 Submissions"
4. Copy the Sheet ID from the URL
   - URL format: `https://docs.google.com/spreadsheets/d/{SHEET_ID}/edit`
   - Example: If URL is `https://docs.google.com/spreadsheets/d/1DEF...789/edit`, the ID is `1DEF...789`
5. Save this **SHEET_ID** for later

---

## Step 3: Set up Google Apps Script

### 3.1 Create New Project

1. Go to [Google Apps Script](https://script.google.com)
2. Click **"New Project"**
3. Name it "OctWave Submission Handler"

### 3.2 Add the Script Code

1. Delete the default code in the editor
2. Copy the entire content from `google-apps-script-submit.js` file in your project root
3. Paste it into the Google Apps Script editor

### 3.3 Configure the Script

Find these lines at the top of the script and update them:

```javascript
const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID_HERE'; // Paste your Sheet ID from Step 2
const DRIVE_FOLDER_ID = 'YOUR_DRIVE_FOLDER_ID_HERE'; // Paste your Folder ID from Step 1
```

**Example:**
```javascript
const SHEET_ID = '1DEF...789';
const DRIVE_FOLDER_ID = '1ABC...XYZ';
```

### 3.4 Test the Setup

1. In the Google Apps Script editor, select the function `testSetup` from the dropdown
2. Click **Run** (play button)
3. **First time only:** You'll be asked to authorize the script
   - Click "Review Permissions"
   - Select your Google account
   - Click "Advanced" → "Go to OctWave Submission Handler (unsafe)"
   - Click "Allow"
4. Check the execution log (View → Logs)
5. You should see:
   ```
   ✓ Sheet access successful: OctWave 2.0 Submissions
   ✓ Drive folder access successful: OctWave 2.0 Submissions
   ✓ Submissions sheet ready: Submissions
   ✓ All setup tests passed!
   ```

---

## Step 4: Deploy the Web App

### 4.1 Create Deployment

1. In Google Apps Script, click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ next to "Select type"
3. Choose **"Web app"**

### 4.2 Configure Deployment

Fill in the following:
- **Description:** "OctWave Submission API v1"
- **Execute as:** "Me (your email)"
- **Who has access:** "Anyone"

### 4.3 Deploy

1. Click **"Deploy"**
2. You may need to authorize again - click "Authorize access"
3. Copy the **Web app URL**
   - It will look like: `https://script.google.com/macros/s/AKfy...xyz/exec`
4. **Important:** Save this URL - you'll need it for the Next.js configuration

---

## Step 5: Configure Next.js Environment

### 5.1 Create/Update .env.local

1. In your project root (`D:\Octwave-2.0`), create or update `.env.local`
2. Add the following line:

```env
GOOGLE_APPS_SCRIPT_SUBMIT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

**Replace** `YOUR_SCRIPT_ID` with the actual URL you copied in Step 4.3

**Example:**
```env
GOOGLE_APPS_SCRIPT_SUBMIT_URL=https://script.google.com/macros/s/AKfy...xyz/exec
```

### 5.2 Verify Environment File

Your complete `.env.local` should now have:

```env
# Registration API (existing)
GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/REGISTRATION_SCRIPT_ID/exec

# Submission API (new)
GOOGLE_APPS_SCRIPT_SUBMIT_URL=https://script.google.com/macros/s/SUBMISSION_SCRIPT_ID/exec
```

---

## Step 6: Test the System

### 6.1 Start Development Server

```bash
npm run dev
```

### 6.2 Access Submission Page

Navigate to: `http://localhost:3000/submit`

### 6.3 Test Submission

1. Fill in all fields:
   - Team ID: `OW_TEST001`
   - Team Name: `Test Team`
   - Leader Email: `test@example.com`
   - Leader Mobile: `0771234567`
   - Upload a test PDF as report
   - Upload a test PPT/PPTX as presentation

2. Click **"Submit Project"**

3. If successful, you should see:
   - Success modal appears
   - Files uploaded to Google Drive in a new folder: `OW_TEST001_Test Team`
   - New row added to Google Sheets with all details

### 6.4 Verify in Google Drive

1. Go to your "OctWave 2.0 Submissions" folder
2. You should see a subfolder: `OW_TEST001_Test Team`
3. Inside, you'll find both uploaded files

### 6.5 Verify in Google Sheets

1. Open your "OctWave 2.0 Submissions" spreadsheet
2. Check the "Submissions" tab
3. You should see a new row with:
   - Timestamp
   - Team ID
   - Team Name
   - Leader Email
   - Leader Mobile
   - Report URL (link to PDF)
   - Presentation URL (link to PPT/PPTX)
   - Folder URL
   - File names

---

## 📊 Google Sheets Structure

The "Submissions" sheet will automatically create these columns:

| Column | Description |
|--------|-------------|
| Timestamp | Date and time of submission |
| Team ID | Team's unique identifier |
| Team Name | Name of the team |
| Leader Email | Team leader's email address |
| Leader Mobile | Team leader's mobile number |
| Report URL | Google Drive link to PDF report |
| Presentation URL | Google Drive link to PPT/PPTX |
| Folder URL | Google Drive link to team's folder |
| Report File Name | Original name of the report file |
| Presentation File Name | Original name of the presentation file |

---

## 🔒 Security & Permissions

### File Permissions
- All uploaded files are set to "Anyone with link can view"
- Only you (the script owner) can edit or delete files
- Team folders are created automatically

### Access Control
- Google Apps Script runs with your permissions
- Teams cannot access each other's submissions
- Only submission details are logged to Sheets

---

## 🛠️ Troubleshooting

### Error: "Server configuration error"
- **Cause:** `GOOGLE_APPS_SCRIPT_SUBMIT_URL` not set in `.env.local`
- **Fix:** Add the environment variable and restart the dev server

### Error: "Failed to upload files"
- **Cause:** Google Apps Script configuration issue
- **Fix:**
  1. Check `SHEET_ID` and `DRIVE_FOLDER_ID` in the script
  2. Run `testSetup()` function in Google Apps Script
  3. Check execution logs for errors

### Files Not Appearing in Drive
- **Cause:** Wrong folder ID or permissions
- **Fix:**
  1. Verify `DRIVE_FOLDER_ID` is correct
  2. Ensure you have edit access to the folder
  3. Re-run `testSetup()` function

### Sheets Not Updating
- **Cause:** Wrong sheet ID or permissions
- **Fix:**
  1. Verify `SHEET_ID` is correct
  2. Ensure you have edit access to the sheet
  3. Check if "Submissions" tab was created

### "File size must not exceed 50MB"
- **Cause:** File is too large
- **Fix:** Ask teams to compress their files or increase the limit in:
  - `src/app/api/submit/route.ts` (line 37)
  - Google Apps Script has a 50MB limit (cannot be changed)

---

## 🔄 Updating the Script

If you need to update the Google Apps Script:

1. Go to your script in [Google Apps Script](https://script.google.com)
2. Make your changes
3. Click **Deploy** → **Manage deployments**
4. Click ✏️ (Edit) on your deployment
5. Change "Version" to "New version"
6. Click **Deploy**
7. **Important:** The URL stays the same - no need to update `.env.local`

---

## 📝 Important Notes

1. **File Size Limit:** Maximum 50MB per file (Google Apps Script limitation)
2. **File Types:**
   - Report: PDF only
   - Presentation: PPT or PPTX only
3. **Duplicate Submissions:** If the same team submits again, files will be added to the same folder
4. **Backup:** Google Drive automatically versions files, so previous submissions are not lost
5. **Storage:** Files count against your Google Drive storage quota

---

## 🎯 Next Steps

After setup is complete:

1. ✅ Test with a real submission
2. ✅ Share the submission link with teams: `https://yourdomain.com/submit`
3. ✅ Monitor submissions in Google Sheets
4. ✅ Access files directly from Google Drive
5. ✅ Set up automated notifications (optional - see Advanced Setup)

---

## 📧 Support Contacts

If teams encounter issues during submission:

- **Renulucshmi Prakasan** (Co-chair): +94754350533
- **Rashmitha Hansamal** (Co-chair): +94776057351
- **Abinaya Subramaniam** (OC): +94763885326

---

## ✨ Features

- ✅ Automatic file uploads to Google Drive
- ✅ Organized by team folders
- ✅ Centralized submission tracking in Google Sheets
- ✅ File type and size validation
- ✅ Mobile-friendly submission form
- ✅ Real-time submission confirmation
- ✅ Shareable Google Drive links
- ✅ Easy access to all submissions

---

**Setup Complete!** 🎉

Your OctWave 2.0 submission system is now ready to accept team submissions.
