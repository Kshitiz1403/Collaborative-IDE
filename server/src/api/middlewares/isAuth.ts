import { Jwt, JwtPayload, verify } from 'jsonwebtoken';
import config from '@/config';
import { Request } from 'express';
import { Logger } from 'winston';
import Container from 'typedi';
import { INextFunction, IRequest, IResponse } from '../types/express';
import { IToken } from '@/interfaces/IToken';


const getTokenFromHeader = (req): string => {
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

const checkToken = (req: Request): IToken => {
  const Logger: Logger = Container.get('logger');
  const token = getTokenFromHeader(req);
  if (!token) throw "Token malformed";
  try{
    const decoded = verify(token, config.jwtSecret, {algorithms:[config.jwtAlgorithm]});
    return decoded;

  }catch(err){
    if (err.name === "TokenExpiredError"){
      // here, we reissue the token using the refresh token from the database
    }
    
    Logger.error('🔥 Error in verifying token: %o', err);
    throw err;
  };
};

const isAuth = async (req: IRequest, res: IResponse, next: INextFunction) => {
  const Logger: Logger = Container.get('logger');
  
  try{
    const token = checkToken(req);
    Logger.debug('User authenticated %o',token);

    req.currentUser = token;
    return next();
  }
  catch(e){
    Logger.error('🔥 Error attaching user to req: %o', e);
    return next(e);
  }
};

export default isAuth;
