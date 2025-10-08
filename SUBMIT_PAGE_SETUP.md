# Submit Page Setup - Simple Guide

## What You Need to Do:

### Step 1: Create Google Drive Folder
1. Go to https://drive.google.com
2. Create folder: "OctWave Submissions"
3. Open it and copy the folder ID from URL:
   - URL: `https://drive.google.com/drive/folders/1ABC123XYZ`
   - Copy: `1ABC123XYZ`

### Step 2: Create Google Sheet
1. Go to https://sheets.google.com
2. Create new sheet: "OctWave Submissions"
3. Copy the sheet ID from URL:
   - URL: `https://docs.google.com/spreadsheets/d/1XYZ789ABC/edit`
   - Copy: `1XYZ789ABC`

### Step 3: Deploy Google Apps Script
1. Go to https://script.google.com
2. New Project
3. Copy code from `google-apps-script-submit.js`
4. Paste it
5. Update these two lines:
   ```javascript
   const SHEET_ID = '1XYZ789ABC';  // Your sheet ID from Step 2
   const DRIVE_FOLDER_ID = '1ABC123XYZ';  // Your folder ID from Step 1
   ```
6. Save (Ctrl+S)
7. Run function `testSetup` - authorize when asked
8. Deploy → New deployment → Web app
9. Execute as: "Me"
10. Who has access: "Anyone"
11. Deploy
12. **Copy the URL** - looks like:
    `https://script.google.com/macros/s/AKfycbz...../exec`

### Step 4: Create .env.local
1. In your project root, create file `.env.local`
2. Add this:
```env
GOOGLE_APPS_SCRIPT_SUBMIT_URL=https://script.google.com/macros/s/YOUR_URL_HERE/exec
```
3. Replace `YOUR_URL_HERE` with the URL from Step 3

### Step 5: Test
```bash
npm run dev
```
Go to http://localhost:3000/submit

Done! ✅
