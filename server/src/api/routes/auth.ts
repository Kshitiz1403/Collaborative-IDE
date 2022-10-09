import { Router, Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { Container } from 'typedi';
import AuthService from '@/services/authService';
import { IUserInputDTO } from '@/interfaces/IUser';
import middlewares from '../middlewares';
import { celebrate, Joi } from 'celebrate';
import { Logger } from 'winston';
import { Result } from '../util/result';
import { IPasswordResetToken } from '@/interfaces/IPasswordResetToken';

const route = Router();

export default (app: Router) => {
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
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling Sign-Up endpoint with body: %o', req.body);
      try {
        const authServiceInstance = Container.get(AuthService);
        const { user, token } = await authServiceInstance.signUp(req.body as IUserInputDTO);
        return res.status(201).json(Result.success<Object>({ user, token }));
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  route.post(
    '/signin',
    celebrate({
      body: Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling Sign-In endpoint with body: %o', req.body);
      try {
        const { username, password } = req.body;
        const authServiceInstance = Container.get(AuthService);
        const { user, token } = await authServiceInstance.signIn(username, password);
        return res.json(Result.success<Object>({ user, token })).status(200);
      } catch (e) {
        return next(e);
      }
    },
  );

  route.post('/forgot', async (req: Request, res: Response, next: NextFunction) => {
    const logger: Logger = Container.get('logger');
    logger.debug('Calling Forgot Password endpoint with body: %o', req.body);
    try {
      const username = req.body?.username;
      const email = req.body.email;
      const authServiceInstance = Container.get(AuthService);
      const status = await authServiceInstance.forgotPassword(username, email);
      return res.status(200).json(Result.success<Object>(status));
    } catch (e) {
      return res.status(500).json(Result.error(e, e.message));
    }
  });

  route.post(
    '/reset',
    middlewares.isResetToken,
    async (req: Request & { token: IPasswordResetToken }, res: Response, next: NextFunction) => {
      try {
        const authServiceInstance = Container.get(AuthService);
        const user = await authServiceInstance.resetPassword(req.token, req.body.password, req.token.username);
        return res.status(200).json(Result.success(user));
      } catch (e) {
        return res.status(500).json(Result.error(e, e.message));
      }
    },
  );

  /**
   * @TODO Let's leave this as a place holder for now
   * The reason for a logout route could be deleting a 'push notification token'
   * so the device stops receiving push notifications after logout.
   *
   * Another use case for advance/enterprise apps, you can store a record of the jwt token
   * emitted for the session and add it to a black list.
   * It's really annoying to develop that but if you had to, please use Redis as your data store
   */
  route.post('/logout', middlewares.isAuth, (req: Request, res: Response, next: NextFunction) => {
    const logger: Logger = Container.get('logger');
    logger.debug('Calling Sign-Out endpoint with body: %o', req.body);
    try {
      //@TODO AuthService.Logout(req.user) do some clever stuff
      return res.status(200).end();
    } catch (e) {
      logger.error('🔥 error %o', e);
      return next(e);
    }
  });
};
