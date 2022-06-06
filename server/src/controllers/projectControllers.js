import db from "../db.js";
import { createProjectDirectoryUtil } from "./fileControllers.js";

const createProjectInDB = (username, projectName) => {
    return new Promise((resolve, reject) => {

        db.query("INSERT INTO projects VALUES(?,?)", [projectName, username], (err, result) => {
            if (err) {
                reject(err);
            }
            resolve({username, projectName});
        })
    })
}

export const createProject = (req, res) => {

    const { username, projectname, language } = req.body

    createProjectDirectoryUtil(username, projectname, language)
        .then(response => {
            createProjectInDB(username, projectname)
                .then(result => {
                    return res.send(result)
                })
                .catch(error => {
                    return res.status(400).send(error);
                })
        }).catch(err => {
            console.error(err)
            return res.status(400).send(err)
        })
}