import { createClient } from 'redis';

const client = createClient();

client.on('error', (err) => console.log('Redis Client Error', err))

await client.connect().then(() => console.log("redis connected"))

export default client