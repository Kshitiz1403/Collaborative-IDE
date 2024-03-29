import { celebrate, Joi } from 'celebrate';
import { Router } from 'express';
import Container from 'typedi';
import { FileController } from '../controllers/fileController';
import middlewares from '../middlewares';

const route = Router();

export default (app: Router) => {
  const ctrl: FileController = Container.get(FileController);
  app.use('/files', route);

  route.get(
    '/',
    celebrate({
      query: Joi.object({
        parent: Joi.string().allow(''),
        name: Joi.string().required().allow(''),
        slug: Joi.string().allow(''),
        project: Joi.string(),
      }),
    }),
    middlewares.isProjectAuth,
    ctrl.get,
  );

  route.post(
    '/save',
    celebrate({
      body: Joi.object({
        name: Joi.string().required().allow(''),
        data: Joi.string().allow(''),
      }),
    }),
    middlewares.isProjectAuth,
    ctrl.save,
  );

  route.post(
    '/folder',
    celebrate({
      body: Joi.object({
        name: Joi.string().required(),
      }),
    }),
    middlewares.isProjectAuth,
    ctrl.createFolder,
  );

  route.patch(
    '/rename',
    celebrate({
      body: Joi.object({
        old_name: Joi.string().required(),
        new_name: Joi.string().required(),
      }),
    }),
    middlewares.isProjectAuth,
    ctrl.rename,
  );

  route.delete(
    '/delete',
    celebrate({
      query: Joi.object({
        parent: Joi.string().allow(''),
        name: Joi.string().allow(''),
        slug: Joi.string().allow(''),
        project: Joi.string(),
      }),
    }),
    middlewares.isProjectAuth,
    ctrl.delete,
  );

  route.get(
    '/tree',
    celebrate({
      query: Joi.object({
        parent: Joi.string().allow(''),
        slug: Joi.string().allow(''),
        project: Joi.string(),
      }),
    }),
    middlewares.isProjectAuth,
    ctrl.getTree,
  );
};
