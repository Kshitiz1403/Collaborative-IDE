import { Router } from 'express';
import auth from './routes/auth';
import container from './routes/container';
import file from './routes/file';
import project from './routes/project';
import user from './routes/user';

// guaranteed to get dependencies
export default () => {
  const app = Router();
  auth(app);
  user(app);
  project(app);
  file(app);
  container(app);

  return app;
};
