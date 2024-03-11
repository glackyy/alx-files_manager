import { createClient } from 'redis';
import { promisify } from 'utils';

class RedisClient {
  constructor() {
    this.client = createClient();
    this.client.on('error', (error) => {
      console.log(`Redis client not connected to server: ${error}`);
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
}