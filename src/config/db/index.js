const mongoose = require('mongoose');
const {createClient} = require('redis');

async function connectToMongodb() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/shop-api');
    console.log('Connect to mongodb successfully!!!');
  } catch (err) {
    console.log(`Connect to mongodb failure!!!`);
    console.log(`error: ${err}`);
  }
}
async function connectToRedis() {
  try {
    const client = await createClient({
      url: `redis://default:${process.env.PASSWORD_REDIS}@redis-10009.c295.ap-southeast-1-1.ec2.redns.redis-cloud.com:10009`,
    });
    return client;
  } catch (err) {
    console.log(`Connect to redis failure!!!`);
    console.log(`error: ${err}`);
  }
}
module.exports = {connectToMongodb, connectToRedis};
