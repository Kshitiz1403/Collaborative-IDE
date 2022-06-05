import { Router } from "express";
import { createProjectDirectory } from "../controllers/fileControllers.js";
import { validateToken } from "../middlewares/authMiddleWare.js";

const router = Router()

router.post("/create", validateToken, (req, res)=>{
    createProjectDirectory(req, res);
})

export default router