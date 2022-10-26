import { createClient } from 'redis';
import Logger from './logger';

const client = createClient();

client.on('error', err => Logger.error('🔥 Error connecting to redis %o', err));

export default client;