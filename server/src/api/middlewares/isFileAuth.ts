import { NextFunction, Request, Response } from 'express';
import { IRequest } from '../types/express';
import Container from 'typedi';
import { checkToken, getTokenFromHeader } from './isAuth';
import { ProjectRepository } from '@/repositories/projectRepository';

const isFileAuth = async (req: Request & { username: string }, res: Response, next: NextFunction) => {
  try {
    const slug: string = req.body['slug'] || req.query['slug'];

    const tokenFromHeader = getTokenFromHeader(req);
    let authenticateWithToken = tokenFromHeader ? true : false;
    let isTokenError = false;

    if (authenticateWithToken) {
      try {
        const user = checkToken(tokenFromHeader);
        req.username = user.username;
        return next();
      } catch (tokenErr) {
        // Invalid token found, proceeds to authenticating with slug
        authenticateWithToken = false;
        isTokenError = true;
      }
    }

    if (!slug) throw 'Authorization Error';
    
    if (!authenticateWithToken && slug) {
      const projectRepositoryInstance = Container.get(ProjectRepository);
      const { username } = await projectRepositoryInstance.findProjectBySlug(slug);
      console.log(username);
      req.username = username;
    }
    return next();
  } catch (err) {
    next('Authorization Error');
  }
};

export default isFileAuth;
