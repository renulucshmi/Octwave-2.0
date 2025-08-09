import { NextRequest, NextResponse } from 'next/server';
import { redis } from '@/lib/redis';

export async function GET(request: NextRequest) {
  try {
    const client = await redis.getClient();
    
    // Get current counter value
    const currentCounter = await client.get('team:counter') || '0';
    
    return NextResponse.json({
      currentCounter: parseInt(currentCounter),
      nextTeamId: `OW_${parseInt(currentCounter) + 1}`
    });

  } catch (error) {
    console.error('Counter API error:', error);
    return NextResponse.json(
      { error: 'Failed to get counter information' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, value } = body;

    const client = await redis.getClient();

    switch (action) {
      case 'reset':
        // Reset counter to 0
        await client.set('team:counter', '0');
        return NextResponse.json({ 
          message: 'Counter reset to 0',
          nextTeamId: 'OW_1'
        });

      case 'set':
        // Set counter to specific value
        if (typeof value !== 'number' || value < 0) {
          return NextResponse.json(
            { error: 'Value must be a non-negative number' },
            { status: 400 }
          );
        }
        await client.set('team:counter', value.toString());
        return NextResponse.json({ 
          message: `Counter set to ${value}`,
          nextTeamId: `OW_${value + 1}`
        });

      default:
        return NextResponse.json(
          { error: 'Invalid action. Use "reset" or "set"' },
          { status: 400 }
        );
    }

  } catch (error) {
    console.error('Counter update error:', error);
    return NextResponse.json(
      { error: 'Failed to update counter' },
      { status: 500 }
    );
  }
}
