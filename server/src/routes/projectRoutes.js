import { Router } from 'express'
import { createProject, createShareIdentifier, getIsRoomIDPresent, getShareIdentifier } from '../controllers/projectControllers.js';
import { validateToken } from '../middlewares/authMiddleWare.js';

const router = Router();

router.post('/create', validateToken, (req, res) => {
    createProject(req, res);
})

router.post('/share/create', validateToken, (req, res) => {
    createShareIdentifier(req, res);
})

router.get('/share/get', validateToken, (req, res) => {
    getShareIdentifier(req, res);
})

router.get('/share/isValid', (req, res)=>{
    getIsRoomIDPresent(req, res);
})

export default router;