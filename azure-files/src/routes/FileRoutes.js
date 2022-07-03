import { Router } from "express";
import { saveDataToFile, deleteDirectoryOrFile, createFolder, rename, readFile } from "../controllers/filesControllers/fileControllers.js";

const router = Router();

router.post('/delete', (req, res) => {
    deleteDirectoryOrFile(req, res);
})

router.post('/create', (req, res) => {
    createFolder(req, res);
})

router.put('/save', (req, res) => {
    saveDataToFile(req, res);
})

router.patch('/rename', (req, res) => {
    rename(req, res);
})

router.get('/read', (req, res) => {
    readFile(req, res);
})

export default router;