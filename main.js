import redisClient from './utils/redis';

(async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Add a delay
    console.log(redisClient.isAlive());
    console.log(await redisClient.get('myKey'));
    await redisClient.set('myKey', 12, 5);
    console.log(await redisClient.get('myKey'));
  
    setTimeout(async () => {
      console.log(await redisClient.get('myKey'));
    }, 1000 * 10);
  })();