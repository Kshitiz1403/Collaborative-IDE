import db from "../../db.js";

export const createProjectInDBUtil = (username, projectName, language) => {
    return new Promise((resolve, reject) => {
        if (!projectName) return reject("Project name cannot be empty")

        db.query("INSERT INTO projects(name, username, language) VALUES(?,?,?)", [projectName, username, language], (err, result) => {
            if (err) {
                return reject(err.code);
            }
            return resolve("Project created");
        })
    })
}

export const getProjectsUtil = (username) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM projects WHERE username = ?", [username], (err, result) => {
            if (err) {
                return reject(err.code)
            }
            return resolve(result)
        })
    })
}

export const getProjectDetailsUtil = (username, projectName) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM projects WHERE username = ? and name = ?", [username, projectName], (err, result) => {
            if (err) {
                reject(err.code)
            }
            if (result.length == 0) reject("Username and projectname combination does not exist")
            resolve(result[0])
        })
    })
}