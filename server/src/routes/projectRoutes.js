import { Router } from 'express'
import { createProject, getProjects } from '../controllers/projectControllers/projectControllers.js';
import { validateToken } from '../middlewares/authMiddleWare.js';

const router = Router();

router.get('/get', validateToken, (req, res) => {
    getProjects(req, res);
})
router.post('/create', validateToken, (req, res) => {
    createProject(req, res);
})

export default router;