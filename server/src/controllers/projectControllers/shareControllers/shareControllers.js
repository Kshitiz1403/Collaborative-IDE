import db from "../../../db.js";
import { createShareIdentifierUtil, getShareIdentifierUtil } from "./shareControllerUtil.js";

export const createShareIdentifier = (req, res) => {
    const { projectName } = req.body;
    const { username } = req.user
    createShareIdentifierUtil(username, projectName)
        .then(response => {
            return res.send(response)
        }).catch(error => {
            return res.status(400).send({ error })
        })
}



export const getShareIdentifier = (req, res) => {
    const { projectName } = req.query;
    const { username } = req.user
    getShareIdentifierUtil(username, projectName)
        .then(response => {
            return res.send(response);
        })
        .catch(error => {
            return res.status(400).send({ error });
        })
}

export const getIsShareIDPresent = (req, res) => {
    const { share } = req.query;
    db.query("SELECT * FROM projects WHERE share = ?", [share], (err, result) => {
        if (err) {
            return res.status(400).send(err.code);
        }
        if (result.length == 0) return res.status(400).send("Share identifier is not valid")
        return res.send(result[0]);
    })
}

export const getProjectDetailsFromShareIdentifier = (req, res) => {
    const { share } = req.query

    db.query(`SELECT username,name FROM projects WHERE share = ?`, [share], (err, result) => {
        if (err) {
            return res.status(400).send({ error: err.code });
        }
        if (result.length == 0) return res.status(400).send({ error: "Share identifier is not valid" })
        return res.send(result[0]);
    })
}