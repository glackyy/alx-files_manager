import { createClient } from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    this.client = createClient();
    this.client.on('error', (error) => {
        console.log(`Redis client error: ${error}`);
      });
  
    this.client.on('connect', () => {
        console.log('Redis client connected to server');
      });
  
    this.client.on('end', () => {
        console.log('Redis client disconnected from server');
      });
    }

  isAlive() {
    if (this.client.connected) {
      return true;
    }
    return false;
  }

  async get(key) {
    const rdGet = promisify(this.client.get).bind(this.client);
    const val = await rdGet(key);
    return val;
  }

  async set(key, value, time) {
    const rdSet = promisify(this.client.set).bind(this.client);
    await rdSet(key, value);
    await this.client.expire(key, time);
  }

  async del(key) {
    const rdDel = promisify(this.client.del).bind(this.client);
    await rdDel(key);
  }
}

const redisClient = new RedisClient();

module.exports = redisClient;
