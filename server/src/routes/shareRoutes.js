import { Router } from "express";
import { createShareIdentifier, getIsShareIDPresent, getProjectDetailsFromShareIdentifier, getShareIdentifier } from "../controllers/projectControllers/shareControllers/shareControllers.js";
import { validateToken } from "../middlewares/authMiddleWare.js";

const router = Router()

router.post('/create', validateToken, (req, res) => {
    createShareIdentifier(req, res);
})

router.get('/get', validateToken, (req, res) => {
    getShareIdentifier(req, res);
})

router.get('/isValid', (req, res) => {
    getIsShareIDPresent(req, res);
})

router.get('/details', (req, res) => {
    getProjectDetailsFromShareIdentifier(req, res);
})


export default router;