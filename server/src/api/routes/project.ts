import { IProjectInputDTO } from '@/interfaces/IProject';
import ProjectService from '@/services/projectService';
import { celebrate, Joi } from 'celebrate';
import { Request, Router } from 'express';
import Container from 'typedi';
import { Logger } from 'winston';
import middlewares from '../middlewares';
import { IRequest, IResponse } from '../types/express';
import { Result } from '../util/result';
const route = Router();

export default (app: Router) => {
  app.use('/projects', route);

  route.post(
    '/create',
    celebrate({
      body: Joi.object({
        name: Joi.string().required(),
        language: Joi.string().required(),
      }),
    }),
    middlewares.isAuth,
    async (req: IRequest, res: IResponse) => {
      const logger: Logger = Container.get('logger');
      try {
        const username = req.currentUser.username;
        const projectServiceInstance = Container.get(ProjectService);
        const project = await projectServiceInstance.createProject({ ...(req.body as IProjectInputDTO), username });

        return res.status(200).json(Result.success<Object>(project));
      } catch (e) {
        return res.status(500).json(Result.error<Object>(e, e.message));
      }
    },
  );

  route.patch('/slug', middlewares.isAuth, async (req: IRequest, res: IResponse) => {
    const logger: Logger = Container.get('logger');
    try {
      const username = req.currentUser.username;
      const projectServiceInstance = Container.get(ProjectService);
      const result = await projectServiceInstance.addSlug(req.body.id, username, req.body.name);

      return res.status(200).json(Result.success<Object>(result));
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return res.status(500).json(Result.error<Object>(e, e.message));
    }
  });

  route.get('/slug', async (req: Request, res: IResponse) => {
    const logger: Logger = Container.get('logger');
    try {
      const projectServiceInstance = Container.get(ProjectService);
      const project = await projectServiceInstance.getProjectBySlug(req.query.slug as string);

      return res.status(200).json(Result.success<Object>(project));
    } catch (e) {
      return res.status(500).json(Result.error<Object>(e, e.message));
    }
  });

  route.get('/', middlewares.isAuth, async (req: IRequest, res: IResponse) => {
    const logger: Logger = Container.get('logger');
    try {
      const username = req.currentUser.username;
      const projectServiceInstance = Container.get(ProjectService);
      const projects = await projectServiceInstance.getAllProjectsForUser(username);
      return res.status(200).json(Result.success<Object>(projects));
    } catch (e) {
      return res.status(500).json(Result.error<Object>(e, e.message));
    }
  });
};
