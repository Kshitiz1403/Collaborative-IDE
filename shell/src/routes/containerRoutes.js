import { Router } from "express";
import { compileCpp, compileJava, compilePython } from "../controllers/compileControllers/compileControllers.js";
import { createContainer, execute, stopAndDelete } from "../controllers/containerControllers/containerControllers.js";

const router = Router()

router.post('/create', (req, res) => {
    createContainer(req, res);
})

router.post('/execute', (req, res) => {
    execute(req, res);
})

router.post("/stop", (req, res) => {
    stopAndDelete(req, res);
})

export default router