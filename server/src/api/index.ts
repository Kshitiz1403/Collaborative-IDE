import { Router } from 'express';
import auth from './routes/auth';
import project from './routes/project';
import user from './routes/user';

// guaranteed to get dependencies
export default () => {
	const app = Router();
	auth(app);
	user(app);
	project(app);

	return app
}