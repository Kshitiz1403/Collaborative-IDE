import { createProjectDirectoryUtil } from "../fileControllers.js";
import { createProjectInDBUtil, getProjectsUtil } from "./projectControllerUtil.js";

export const createProject = (req, res) => {
    const { projectName, language } = req.body
    const { username } = req.user
    createProjectInDBUtil(username, projectName, language)
        .then(result => {
            createProjectDirectoryUtil(username, projectName, language)
                .then(response => {
                    return res.send({ code: result })
                })
                .catch(err => {
                    return res.status(400).send({ error: err });
                    // TO DO - handle deleting project from db
                })
        }).catch(err => {
            console.error(err)
            return res.status(400).send({ error: err })
        })
}

export const getProjects = (req, res) => {
    const { username } = req.user;
    getProjectsUtil(username).then((result) => {
        return res.send({ code: result })
    }).catch(err => {
        return res.status(400).send({ error: err })
    })
}