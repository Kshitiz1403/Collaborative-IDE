import validator from "validator";

import db from "../db.js";

export const register = (req, res) => {
    const { username, email, password } = req.body;

    if (!validator.isEmail(email)) return res.status(400).send({ message: "email is not valid" })
    if (!validator.isStrongPassword(password)) return res.status(400).send({ message: "password is not strong" })

    db.query("INSERT INTO users (username, password, email) VALUES (?,?,?)", [username, password, email], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(400).send({ message: "Username or email is taken" })
        }
        return res.send(result)
    })

}

export const login = (req, res) => {
    const { username, password } = req.body;

    db.query("SELECT * FROM users WHERE username=? AND password=?", [username, password], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(400).send(err)
        }
        if (result.length > 0) {
            return res.send(result)
        }
        return res.status(400).send({ message: "Wrong username/password combination" })
    })
}