import db from "../../../db.js";
import { generateSlug } from "random-word-slugs";

export const createShareIdentifierUtil = (username, projectName) => {
    const identifier = generateSlug(5);

    return new Promise((resolve, reject) => {

        db.query("SELECT * FROM projects WHERE username = ? and name = ?;", [username, projectName], (error, result) => {
            if (error) {
                console.log(error)
                reject(error.code)
            }

            if (result.length == 0) reject("Username & projectname combination does not exist");

            db.query("update projects set share = ?  WHERE username = ? and name = ?;", [identifier, username, projectName], (err, result) => {
                if (err) {
                    console.log(err)
                    reject(err.code)
                }
                resolve({ username, projectname: projectName, share: identifier })
            })
        })

    })
}

export const getShareIdentifierUtil = (username, projectname) => {
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