import { Router } from 'express';
import { Container } from 'typedi';
import middlewares from '../middlewares';
import { celebrate, Joi } from 'celebrate';
import { AuthController } from '../controllers/authController';

const route = Router();

export default (app: Router) => {
  const ctrl: AuthController = Container.get(AuthController);
  app.use('/auth', route);

  route.post(
    '/signup',
    celebrate({
      body: Joi.object({
        name: Joi.string().required(),
        username: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
      }),
    }),
    middlewares.attachIP,
    ctrl.signup,
  );

  route.post(
    '/signin',
    celebrate({
      body: Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
      }),
    }),
    ctrl.signin,
  );

  route.post('/forgot', ctrl.forgot);

  route.get('/reset', middlewares.isResetToken, ctrl.checkResetToken);

  route.post('/reset', middlewares.isResetToken, ctrl.reset);

  /**
   * @TODO Let's leave this as a place holder for now
   * The reason for a logout route could be deleting a 'push notification token'
   * so the device stops receiving push notifications after logout.
   *
   * Another use case for advance/enterprise apps, you can store a record of the jwt token
   * emitted for the session and add it to a black list.
   * It's really annoying to develop that but if you had to, please use Redis as your data store
   */
  route.post('/logout', middlewares.isAuth, ctrl.logout);
};
