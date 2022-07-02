import { Router } from "express";
import { compileCpp, compileJava, compilePython } from "../controllers/compileControllers/compileControllers.js";

const router = Router()

router.post("/java", (req, res) => {
    compileJava(req, res);
})

router.post('/cpp', (req, res) => {
    compileCpp(req, res);
})

router.post('/python', (req, res) => {
    compilePython(req, res);
})

export default router;