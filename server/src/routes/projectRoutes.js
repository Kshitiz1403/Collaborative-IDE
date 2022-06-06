import { Router } from 'express'
import { createProject } from '../controllers/projectControllers.js';
import { validateToken } from '../middlewares/authMiddleWare.js';

const router = Router();

router.post('/create', validateToken, (req, res) => {
    createProject(req, res);
})

export default router;