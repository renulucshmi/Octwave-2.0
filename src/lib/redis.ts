import { createClient, RedisClientType } from 'redis';

class RedisConnection {
  private static instance: RedisConnection;
  private client: RedisClientType | null = null;
  private isConnecting = false;

  private constructor() {}

  public static getInstance(): RedisConnection {
    if (!RedisConnection.instance) {
      RedisConnection.instance = new RedisConnection();
    }
    return RedisConnection.instance;
  }

  public async getClient(): Promise<RedisClientType> {
    if (this.client && this.client.isOpen) {
      return this.client;
    }

    if (this.isConnecting) {
      // Wait for the connection to complete
      while (this.isConnecting) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      if (this.client && this.client.isOpen) {
        return this.client;
      }
    }

    this.isConnecting = true;

    try {
      // Option 1: Use REDIS_URL (recommended)
      if (process.env.REDIS_URL) {
        this.client = createClient({
          url: process.env.REDIS_URL
        });
      } else {
        // Option 2: Use individual environment variables
        this.client = createClient({
          username: process.env.REDIS_USERNAME || 'default',
          password: process.env.REDIS_PASSWORD,
          socket: {
            host: process.env.REDIS_HOST,
            port: parseInt(process.env.REDIS_PORT || '6379')
          }
        });
      }

      this.client.on('error', (err) => {
        console.error('Redis Client Error:', err);
      });

      this.client.on('connect', () => {
        console.log('Redis client connected');
      });

      this.client.on('ready', () => {
        console.log('Redis client ready');
      });

      this.client.on('end', () => {
        console.log('Redis client disconnected');
      });

      await this.client.connect();
      this.isConnecting = false;
      return this.client;
    } catch (error) {
      this.isConnecting = false;
      console.error('Failed to connect to Redis:', error);
      throw error;
    }
  }

  public async disconnect(): Promise<void> {
    if (this.client && this.client.isOpen) {
      await this.client.disconnect();
      this.client = null;
    }
  }

  // Utility methods for common operations
  public async set(key: string, value: string, ttl?: number): Promise<void> {
    const client = await this.getClient();
    if (ttl) {
      await client.setEx(key, ttl, value);
    } else {
      await client.set(key, value);
    }
  }

  public async get(key: string): Promise<string | null> {
    const client = await this.getClient();
    return await client.get(key);
  }

  public async del(key: string): Promise<number> {
    const client = await this.getClient();
    return await client.del(key);
  }

  public async exists(key: string): Promise<number> {
    const client = await this.getClient();
    return await client.exists(key);
  }

  public async expire(key: string, seconds: number): Promise<boolean> {
    const client = await this.getClient();
    const result = await client.expire(key, seconds);
    return result === 1;
  }

  // Hash operations
  public async hSet(key: string, field: string, value: string): Promise<number> {
    const client = await this.getClient();
    return await client.hSet(key, field, value);
  }

  public async hGet(key: string, field: string): Promise<string | undefined> {
    const client = await this.getClient();
    const result = await client.hGet(key, field);
    return result || undefined;
  }

  public async hGetAll(key: string): Promise<Record<string, string>> {
    const client = await this.getClient();
    return await client.hGetAll(key);
  }

  // List operations
  public async lPush(key: string, ...elements: string[]): Promise<number> {
    const client = await this.getClient();
    return await client.lPush(key, elements);
  }

  public async rPush(key: string, ...elements: string[]): Promise<number> {
    const client = await this.getClient();
    return await client.rPush(key, elements);
  }

  public async lPop(key: string): Promise<string | null> {
    const client = await this.getClient();
    return await client.lPop(key);
  }

  public async rPop(key: string): Promise<string | null> {
    const client = await this.getClient();
    return await client.rPop(key);
  }

  public async lRange(key: string, start: number, stop: number): Promise<string[]> {
    const client = await this.getClient();
    return await client.lRange(key, start, stop);
  }

  public async incr(key: string): Promise<number> {
    const client = await this.getClient();
    return await client.incr(key);
  }

  public async decr(key: string): Promise<number> {
    const client = await this.getClient();
    return await client.decr(key);
  }
}

// Export a singleton instance
export const redis = RedisConnection.getInstance();

// Export the class for testing purposes
export default RedisConnection;
