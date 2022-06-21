import { deleteDirectoryOrFileUtil } from "./fileControllerUtil.js"

export const deleteDirectoryOrFile = (req, res) => {
    const { username, projectName, directoryPath } = req.body
    deleteDirectoryOrFileUtil(username, projectName, directoryPath)
        .then(result => {
            return res.send(result)
        })
        .catch(err => {
            console.log(err)
            return res.status(400).send({ err: err.toString() })
        })
}