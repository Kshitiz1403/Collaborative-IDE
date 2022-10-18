import { celebrate, Joi } from 'celebrate';
import { Router } from 'express';
import Container from 'typedi';
import { ProjectController } from '../controllers/projectController';
import middlewares from '../middlewares';
const route = Router();

export default (app: Router) => {
  const ctrl: ProjectController = Container.get(ProjectController);
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
    ctrl.create,
  );

  route.patch('/slug', middlewares.isAuth, ctrl.addSlug);

  route.get('/slug', ctrl.getBySlug);

  route.get('/', middlewares.isAuth, ctrl.getAllProjects);
};
