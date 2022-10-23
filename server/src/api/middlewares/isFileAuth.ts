import { NextFunction, Response } from 'express';
import { IFileRequest } from '../types/express';
import Container from 'typedi';
import { checkToken, getTokenFromHeader } from './isAuth';
import { ProjectRepository } from '@/repositories/projectRepository';

const isFileAuth = async (req: IFileRequest, res: Response, next: NextFunction) => {
  try {
    const slug: string = req.body['slug'] || req.query['slug'];

    if (slug) {
      const projectRepositoryInstance = Container.get(ProjectRepository);
      const { username, slug_expiry, name } = await projectRepositoryInstance.findProjectBySlug(slug);
      const now = new Date();
      if (now > slug_expiry) throw 'Authorization Error';
      req.username = username;
      req.project_name = name;
      return next();
    }

    const tokenFromHeader = getTokenFromHeader(req);
    if (tokenFromHeader) {
      try {
        const user = checkToken(tokenFromHeader);
        req.username = user.username;
        return next();
      } catch (tokenErr) {
      }
    }

    throw 'Authorization Error';
  } catch (err) {
    next('Authorization Error');
  }
};

export default isFileAuth;
