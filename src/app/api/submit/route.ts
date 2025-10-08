import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const teamId = formData.get('teamId') as string;
    const teamName = formData.get('teamName') as string;
    const leaderEmail = formData.get('leaderEmail') as string;
    const leaderMobile = formData.get('leaderMobile') as string;
    const reportFile = formData.get('reportFile') as File;
    const presentationFile = formData.get('presentationFile') as File;

    // Validate all fields
    if (!teamId || !teamName || !leaderEmail || !leaderMobile || !reportFile || !presentationFile) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate file types
    if (reportFile.type !== 'application/pdf') {
      return NextResponse.json(
        { success: false, error: 'Report must be a PDF file' },
        { status: 400 }
      );
    }

    const validPptTypes = [
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    ];
    if (!validPptTypes.includes(presentationFile.type)) {
      return NextResponse.json(
        { success: false, error: 'Presentation must be a PPT or PPTX file' },
        { status: 400 }
      );
    }

    // Validate file sizes (50MB max)
    const maxSize = 50 * 1024 * 1024; // 50MB in bytes
    if (reportFile.size > maxSize || presentationFile.size > maxSize) {
      return NextResponse.json(
        { success: false, error: 'File size must not exceed 50MB' },
        { status: 400 }
      );
    }

    // Convert files to base64 for Google Apps Script
    const reportBuffer = await reportFile.arrayBuffer();
    const reportBase64 = Buffer.from(reportBuffer).toString('base64');

    const presentationBuffer = await presentationFile.arrayBuffer();
    const presentationBase64 = Buffer.from(presentationBuffer).toString('base64');

    // Get Google Apps Script URL from environment
    const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_SUBMIT_URL;

    if (!scriptUrl) {
      console.error('GOOGLE_APPS_SCRIPT_SUBMIT_URL not configured');
      return NextResponse.json(
        { success: false, error: 'Server configuration error. Please contact the organizers.' },
        { status: 500 }
      );
    }

    // Send to Google Apps Script
    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        teamId,
        teamName,
        leaderEmail,
        leaderMobile,
        reportFile: {
          name: reportFile.name,
          mimeType: reportFile.type,
          data: reportBase64
        },
        presentationFile: {
          name: presentationFile.name,
          mimeType: presentationFile.type,
          data: presentationBase64
        }
      })
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      console.error('Google Apps Script error:', result);
      return NextResponse.json(
        { success: false, error: result.error || 'Failed to upload files' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Submission successful',
      reportUrl: result.reportUrl,
      presentationUrl: result.presentationUrl
    });

  } catch (error) {
    console.error('Submission error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error. Please try again or contact support.' },
      { status: 500 }
    );
  }
}

// Configure for larger file uploads
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '50mb',
    },
  },
};
