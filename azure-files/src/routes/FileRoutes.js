import { Router } from "express";
import { saveDataToFile, deleteDirectoryOrFile, createFolder } from "../controllers/filesControllers/fileControllers.js";

const router = Router();

router.delete('/delete', (req, res) => {
    deleteDirectoryOrFile(req, res);
})

router.post('/create', (req, res) => {
    createFolder(req, res);
})

router.put('/save', (req, res) => {
    saveDataToFile(req, res);
})

export default router;