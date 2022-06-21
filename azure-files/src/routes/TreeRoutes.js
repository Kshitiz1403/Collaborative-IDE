import { Router } from "express";
import { getTree } from "../controllers/treeControllers/treeControllers.js";

const router = Router()

router.get('/', (req, res) => {
    getTree(req, res)
})

export default router