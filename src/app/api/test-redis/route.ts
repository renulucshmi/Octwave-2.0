import { NextResponse } from 'next/server';
import { redis } from '@/lib/redis';

export async function GET() {
  try {
    // Test basic operations
    await redis.set('test-key', 'Hello Redis!');
    const value = await redis.get('test-key');
    
    // Test with TTL
    await redis.set('temp-key', 'This will expire', 60); // 60 seconds TTL
    
    // Test hash operations
    await redis.hSet('user:1', 'name', 'John Doe');
    await redis.hSet('user:1', 'email', 'john@example.com');
    const userData = await redis.hGetAll('user:1');
    
    // Test list operations
    await redis.rPush('notifications', 'Welcome!', 'Setup complete!');
    const notifications = await redis.lRange('notifications', 0, -1);

    return NextResponse.json({
      success: true,
      message: 'Redis operations completed successfully',
      data: {
        basicTest: value,
        userData,
        notifications,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Redis test error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Redis operation failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { key, value, ttl } = body;

    if (!key || !value) {
      return NextResponse.json(
        { success: false, message: 'Key and value are required' },
        { status: 400 }
      );
    }

    await redis.set(key, value, ttl);
    
    return NextResponse.json({
      success: true,
      message: `Successfully set ${key}`,
      data: { key, value, ttl }
    });
  } catch (error) {
    console.error('Redis POST error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to set Redis key',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get('key');

    if (!key) {
      return NextResponse.json(
        { success: false, message: 'Key parameter is required' },
        { status: 400 }
      );
    }

    const deletedCount = await redis.del(key);
    
    return NextResponse.json({
      success: true,
      message: `Deleted ${deletedCount} key(s)`,
      data: { key, deletedCount }
    });
  } catch (error) {
    console.error('Redis DELETE error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to delete Redis key',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
