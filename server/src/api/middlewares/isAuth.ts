import { verify } from 'jsonwebtoken';
import config from '@/config';
import { Request } from 'express';
import { Logger } from 'winston';
import Container from 'typedi';
import DIContainer from '@/container';
import { UserRepository } from '@/repositories/userRepository';
import { INextFunction, IRequest, IResponse } from '../types/express';

type token = {
  id:number; 
  role:string; 
  username:string
}

const getTokenFromHeader = (req): token => {
  /**
   * @TODO Edge and Internet Explorer do some weird things with the headers
   * So I believe that this should handle more 'edge' cases ;)
   */
  if (
    (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token') ||
    (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
  ) {
    return req.headers.authorization.split(' ')[1];
  }
  return null;
};

const checkToken = (req: Request): token  => {
  const Logger: Logger = Container.get('logger');
  const token = getTokenFromHeader(req);
  return verify(token, config.jwtSecret, { algorithms: [config.jwtAlgorithm] }, (err, decoded) => {
    if (err) {
      Logger.error('🔥 Error in verifying token: %o', err);
      throw err;
    }
    return decoded;
  });
};

const isAuth = async (req: IRequest, res: IResponse, next: INextFunction) => {
  const Logger: Logger = Container.get('logger');

  const token = checkToken(req);
  const userRepository = DIContainer.resolve(UserRepository);

  try{
    const userRecord = await userRepository.findUserById(token.id);
  
    if (!userRecord){
      Logger.error('🔥 User record not found: %o', token);
      return res.sendStatus(401);
    }
  
    const currentUser = userRecord;
  
    Reflect.deleteProperty(currentUser, 'salt');
    Reflect.deleteProperty(currentUser, 'password');
  
    req.currentUser = currentUser;
    Logger.info('User authenticated %o', currentUser);
    return next();
  }
  catch(e){
    Logger.error('🔥 Error attaching user to req: %o', e);
    return next(e);
  }
};

export default isAuth;
