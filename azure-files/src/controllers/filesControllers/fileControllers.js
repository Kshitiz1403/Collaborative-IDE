import { saveDataToFileUtil, deleteDirectoryOrFileUtil, createFolderUtil } from "./fileControllerUtil.js"

export const deleteDirectoryOrFile = (req, res) => {
    const { username, projectName, path } = req.body
    deleteDirectoryOrFileUtil(username, projectName, path)
        .then(result => {
            return res.send(result)
        })
        .catch(err => {
            console.log(err)
            return res.status(400).send({ err: err.toString() })
        })
}

export const createFolder = (req, res) => {
    const { username, projectName, path } = req.body;

    createFolderUtil(username, projectName, path)
        .then((result) => {
            return res.send({ code: result })
        })
        .catch((err) => {
            return res.status(400).send({ error: err })
        })
}

export const saveDataToFile = (req, res) => {
    // To do -> handle multi line input from json
    const { username, projectName, path, data } = req.body

    saveDataToFileUtil(username, projectName, path, data)
        .then(result => {
            return res.send({ result })
        })
        .catch(err => {
            console.log(err)
            return res.status(400).send({ err })
        })
}