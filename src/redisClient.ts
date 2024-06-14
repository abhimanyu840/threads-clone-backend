import Redis from "ioredis";

const redisClient = new Redis({
    password: String(process.env.REDIS_PASSWORD),
    host: String(process.env.REDIS_HOST),
    port: Number(process.env.REDIS_PORT)
});

redisClient.on('connect', () => {
    console.log('Redis Connected')
})

redisClient.on('error', (err) => {
    console.log('Redis Connection Error', err)
})

export default redisClient;
