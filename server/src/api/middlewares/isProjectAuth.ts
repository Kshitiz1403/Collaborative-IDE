import { NextFunction, Response } from 'express';
import { IProjectRequest } from '../types/express';
import Container from 'typedi';
import { checkToken, getTokenFromHeader } from './isAuth';
import { ProjectRepository } from '@/repositories/projectRepository';
import { Logger } from 'winston';

const isProjectAuth = async (req: IProjectRequest, res: Response, next: NextFunction) => {
  try {
    const logger: Logger = Container.get('logger');
    const slug: string = req.body['slug'] || req.query['slug'];
    const projectRepositoryInstance = Container.get(ProjectRepository);

    const tokenFromHeader = getTokenFromHeader(req);
    if (tokenFromHeader) {
      const user = checkToken(tokenFromHeader);
      req.username = user.username;

      const projectName = req.query.project as string;
      if (!projectName) throw 'Project name not provided';

      logger.silly(`Authorizing request for user ${user.username}`);
      const project = await projectRepositoryInstance.findProjectByNameForUser(user.username, projectName);
      req.project = project;

      return next();
    }

    if (slug) {
      const project = await projectRepositoryInstance.findProjectBySlug(slug);
      const { username, slug_expiry, name } = project;
      const now = new Date();
      if (now > slug_expiry) throw 'Authorization Error';
      logger.silly(`Authorizing request with the slug ${slug}`);

      req.username = username;
      req.project = project;
      return next();
    }

    throw 'Authorization Error';
  } catch (err) {
    next('Authorization Error');
  }
};

export default isProjectAuth;
