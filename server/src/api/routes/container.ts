import { Router } from 'express';
import Container from 'typedi';
import { ContainerController } from '../controllers/containerController';
import middlewares from '../middlewares';
const route = Router();

export default (app: Router) => {
  const ctrl: ContainerController = Container.get(ContainerController);
  app.use('/compile', route);

  route.post(
    '/',
    middlewares.isProjectAuth,
    middlewares.rateLimit({ secondsWindow: 60, allowedHits: 10, originalUrl: '/compile' }),
    ctrl.compile,
  );
};
