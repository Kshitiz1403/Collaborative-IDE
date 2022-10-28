import { NextFunction, Request, Response } from 'express';
import cache from '@/loaders/cache';
import { IRateLimit } from '@/interfaces/IRateLimit';
import { Logger } from 'winston';
import Container from 'typedi';

const rateLimit = ({ secondsWindow = 60, allowedHits = 10, originalUrl }: IRateLimit) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const key = originalUrl + ip;

    const requests = await cache.incr(key);

    let ttl;

    if (requests === 1) {
      await cache.expire(key, secondsWindow);
      ttl = 60;
    } else {
      ttl = await cache.ttl(key);
    }

    if (requests > allowedHits) {
      const logger: Logger = Container.get('logger');
      logger.warn(`Rate limiting the ip ${ip} for ${originalUrl}`);

      return next({ status: 429, message: `You have been rate limited, please try again in ${ttl} seconds.` });
    }
    return next();
  };
};

export default rateLimit;
