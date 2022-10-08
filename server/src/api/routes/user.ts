import { Router } from 'express';
import middlewares from '../middlewares';
import { IRequest, IResponse } from '../types/express';
const route = Router();

export default (app: Router) => {
  app.use('/users', route);

  route.get('/me', middlewares.isAuth, (req: IRequest, res: IResponse) => {
    return res.json({ user: req.currentUser }).status(200);
  });
};
