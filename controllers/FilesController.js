import { promises as fs } from 'fs';
import { ObjectID } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';
import Queue from 'bull';
import dbClient from '../utils/db';
import redisClient from '../utils/redis';
import mime from 'mime-types';

const fileQueue = new Queue('fileQueue', 'redis://127.0.0.1:6379');

class FilesController {
  static async getUser(request) {
    const token = request.header('X-Token');
    const key = `auth_${token}`;
    const userId = await redisClient.get(key);
    if (userId) {
      const users = dbClient.client.db().collection('users');
      const idObject = new ObjectID(userId);
      const user = await users.findOne({ _id: idObject });
      if (!user) {
        return null;
      }
    }
  }
}