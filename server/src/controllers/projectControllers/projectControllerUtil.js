import db from "../../db.js";

export const createProjectInDBUtil = (username, projectName, language) => {
    return new Promise((resolve, reject) => {

        db.query("INSERT INTO projects(name, username, language) VALUES(?,?,?)", [projectName, username, language], (err, result) => {
            if (err) {
                reject(err.code);
            }
            resolve("Project created");
        })
    })
}

export const getProjectsUtil = (username) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT name, language FROM projects WHERE username = ?", [username], (err, result) => {
            if (err) {
                return reject(err.code)
            }
            return resolve(result)
        })
    })
}