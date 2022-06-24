import "dotenv/config";
import express from 'express';
import cors from 'cors'
import db from './db.js';
import authRoutes from './routes/authRoutes.js'
import projectRoutes from './routes/projectRoutes.js'
import shareRoutes from './routes/shareRoutes.js'

const app = express();

app.use(express.json())

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
app.use('/share', shareRoutes)

app.get('/', (req, res)=>{
    res.send("hi")
})
app.listen(4000, () => {
    console.log("app running on 4000...")
})