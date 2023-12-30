import { createClient } from 'redis';
import Logger from './logger';
import config from '@/config';

const client = createClient({
    socket: {
        host: config.cache.host,
        port: config.cache.port,
      },
});

client.on('error', err => Logger.error('🔥 Error connecting to redis %o', err));

export default client;