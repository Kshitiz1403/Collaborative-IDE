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
        name: Joi.string().required(),
      }),
    }),
    middlewares.isFileAuth,
    ctrl.get,
  );

  route.post(
    '/save',
    celebrate({
      body: Joi.object({
        parent: Joi.string().allow(''),
        name: Joi.string().required(),
        data: Joi.string(),
      }),
    }),
    middlewares.isFileAuth,
    ctrl.save,
  );

  route.post(
    '/create',
    celebrate({
      body: Joi.object({
        parent: Joi.string().allow(''),
        name: Joi.string().required(),
      }),
    }),
    middlewares.isFileAuth,
    ctrl.create,
  );

  route.patch(
    '/rename',
    celebrate({
      body: Joi.object({
        parent: Joi.string().allow(''),
        old_name: Joi.string().required(),
        new_name: Joi.string().required(),
      }),
    }),
    middlewares.isFileAuth,
    ctrl.rename,
  );

  route.delete(
    '/delete',
    celebrate({
      query: Joi.object({
        parent: Joi.string().allow(''),
        name: Joi.string().required(),
      }),
    }),
    middlewares.isFileAuth,
    ctrl.delete,
  );
};
