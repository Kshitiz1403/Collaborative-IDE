import { saveDataToFileUtil, deleteDirectoryOrFileUtil, createFolderUtil, deleteByPathUtil, createFolderByPathUtil, saveDataToFileByPathUtil, renameByPathUtil, renameUtil, readFileUtil } from "./fileControllerUtil.js"

export const deleteDirectoryOrFile = (req, res) => {
    const { username = "", projectName = "", path } = req.body

    if (!username && !projectName) {
        return deleteByPathUtil(path)
            .then(result => {
                return res.send(result)
            })
            .catch(err => {
                return res.status(400).send(err)
            })
    }
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
    const { username = "", projectName = "", path } = req.body

    if (!username && !projectName) {
        return createFolderByPathUtil(path)
            .then(result => {
                return res.send({ code: result })
            })
            .catch(err => {
                return res.status(400).send({ error: err })
            })
    }

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
    const { username = "", projectName = "", path, data = "" } = req.body

    if (!username && !projectName) {
        return saveDataToFileByPathUtil(path, data)
            .then(result => {
                return res.send({ code: result })
            })
            .catch(err => {
                return res.status(400).send({ error: err })
            })
    }

    saveDataToFileUtil(username, projectName, path, data)
        .then(result => {
            return res.send({ code: result })
        })
        .catch(err => {
            console.log(err)
            return res.status(400).send({ error: err })
        })
}

export const rename = (req, res) => {
    const { username = "", projectName = "", oldPath, newPath } = req.body

    if (!username && !projectName) {
        return renameByPathUtil(oldPath, newPath)
            .then(result => {
                return res.send({ code: result })
            }).catch(err => {
                return res.status(400).send({ error: err })
            })
    }
    return renameUtil(username, projectName, oldPath, newPath)
        .then(result => {
            return res.send({ code: result })
        }).catch(err => {
            return res.status(400).send({ error: err })
        })
}

export const readFile = (req, res) => {
    const { username, projectName, path } = req.query
    return readFileUtil(username, projectName, path)
        .then(result => {
            return res.send({ code: result })
        })
        .catch(err => {
            return res.status(400).send({ error: err })
        })
}