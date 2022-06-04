import express, { json } from 'express';
import { createConnection } from 'mysql';
import validator from 'validator'
import cors from 'cors'

const app = express();

app.use(json())

app.use(cors({
    origin: '*'
}))

const db = createConnection({
    user: 'root',
    host: 'localhost',
    database: 'collaborative-ide'
})

db.connect((err) => {
    if (err) {
        throw new Error(err)
    }
    console.log("connected to db...")
})

app.post("/register", (req, res) => {
    const { username, email, password } = req.body;

    if (!validator.isEmail(email)) return res.status(400).send({ message: "email is not valid" })
    if (!validator.isStrongPassword(password)) return res.status(400).send({ message: "password is not strong" })

    db.query("INSERT INTO users (username, password, email) VALUES (?,?,?)", [username, password, email], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(400).send({message:"Username or email is taken"})
        }
        return res.send(result)
    })
})

app.post("/login", (req, res) => {
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
})

app.listen(4000, () => {
    console.log("app running on 4000...")
})