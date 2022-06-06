import dotenv from "dotenv";
dotenv.config()
import express, { json } from 'express';
import cors from 'cors'
import db from './db.js';
import authRoutes from './routes/authRoutes.js'
import projectRoutes from './routes/projectRoutes.js'

const app = express();

app.use(json())

app.use(cors({
    origin: '*'
}))

db.connect((err) => {
    if (err) {
        throw new Error(err)
    }
    console.log("connected to db...")
})

app.use('/auth', authRoutes)

app.use('/', projectRoutes)

app.listen(4000, () => {
    console.log("app running on 4000...")
})