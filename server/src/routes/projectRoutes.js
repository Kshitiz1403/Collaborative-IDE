import { Router } from 'express'
import { createProject, getProjectDetails, getProjects } from '../controllers/projectControllers/projectControllers.js';
import { validateToken } from '../middlewares/authMiddleWare.js';

const router = Router();

router.get('/all', validateToken, (req, res) => {
    getProjects(req, res);
})
router.post('/create', validateToken, (req, res) => {
    createProject(req, res);
})
router.get('/project', validateToken, (req, res)=>{
    getProjectDetails(req, res);
})

export default router;