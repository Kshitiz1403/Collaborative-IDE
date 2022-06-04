import dotenv from "dotenv";
dotenv.config()
import db from "../db.js";
import validator from "validator";
import jsonwebtoken from "jsonwebtoken"

export const register = (req, res) => {
    const { username, email, password } = req.body;

    if (!validator.isEmail(email)) return res.status(400).send({ message: "email is not valid" })
    if (!validator.isStrongPassword(password)) return res.status(400).send({ message: "password is not strong" })

    db.query("INSERT INTO users (username, password, email) VALUES (?,?,?)", [username, password, email], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(400).send({ message: "Username or email is taken" })
        }
        const accessToken = jsonwebtoken.sign({ username: username }, process.env.jsonwebtokensecret)

        return res.send({ accessToken })
    })

}

export const login = (req, res) => {
    const { username, password } = req.body;

    db.query("SELECT * FROM users WHERE username=? AND password=?", [username, password], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(400).send({ message: err })
        }
        if (result.length > 0) {

            const accessToken = jsonwebtoken.sign({ username: username }, process.env.jsonwebtokensecret)

            return res.send({ accessToken })
        }
        return res.status(400).send({ message: "Wrong username/password combination" })
    })
}