import db from "../db.js";
import { createProjectDirectoryUtil } from "./fileControllers.js";
import { generateSlug } from 'random-word-slugs'

const createProjectInDB = (username, projectName, language) => {
    return new Promise((resolve, reject) => {

        db.query("INSERT INTO projects VALUES(?,?,?)", [projectName, username, language], (err, result) => {
            if (err) {
                reject(err);
            }
            resolve({ username, projectName, language });
        })
    })
}

export const createProject = (req, res) => {

    const { username, projectname, language } = req.body

    createProjectDirectoryUtil(username, projectname, language)
        .then(response => {
            createProjectInDB(username, projectname, language)
                .then(result => {
                    return res.send(result)
                })
                .catch(error => {
                    return res.status(400).send(error.code);
                })
        }).catch(err => {
            console.error(err)
            return res.status(400).send(err)
        })
}

const createShareIdentifierUtil = (username, projectname) => {
    const identifier = generateSlug(5);

    return new Promise((resolve, reject) => {

        db.query("SELECT * FROM projects WHERE username = ? and name = ?;", [username, projectname], (erro, resu) => {
            if (erro) {
                console.log(erro)
                reject(erro.code)
            }

            if (resu.length == 0) reject("Username & projectname combination does not exist");

            db.query("update projects set share = ?  WHERE username = ? and name = ?;", [identifier, username, projectname], (err, result) => {
                if (err) {
                    console.log(err)
                    reject(err.code)
                }
                console.log(result)
                resolve({ username, projectname, share:identifier })
            })
        })

    })
}

export const createShareIdentifier = (req, res) => {
    const { username, projectname } = req.body;
    createShareIdentifierUtil(username, projectname)
        .then(response => {
            return res.send(response)
        }).catch(error => {
            return res.status(400).send(error)
        })
}

const getShareIdentifierUtil = (username, projectname) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM projects WHERE username = ? and name = ?;", [username, projectname], (erro, resu) => {
            if (erro) {
                console.log(erro)
                reject(erro.code)
            }

            console.log(resu)
            if (resu.length === 0) reject("Username & projectname combination does not exist");

            db.query("SELECT share from projects WHERE username = ? and name = ?;", [username, projectname], (error, result) => {
                if (error) {
                    console.log(error);
                    reject(erro.code);
                }
                resolve(result[0]);
            })
        })
    })
}

export const getShareIdentifier = (req, res) => {

    const { username, projectname } = req.query;

    getShareIdentifierUtil(username, projectname)
        .then(response => {
            return res.send(response);
        })
        .catch(error => {
            return res.status(400).send(error);
        })
}

export const getIsRoomIDPresent = (req, res) => {
    const { roomid } = req.query;
    db.query("SELECT * FROM projects WHERE share = ?", [roomid], (err, result) => {
        if (err) {
            return res.status(400).send(err.code);
        }
        if (result.length == 0) return res.status(400).send("Roomid is not valid")
        return res.send(result[0]);
    })
}
