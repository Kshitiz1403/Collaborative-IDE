import { Router } from "express";
import { deleteDirectoryOrFile } from "../controllers/filesControllers/fileControllers.js";

const router = Router();

router.post('/delete', (req, res) => {
    deleteDirectoryOrFile(req, res);
})

export default router;