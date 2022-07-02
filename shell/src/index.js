import express from 'express'
import redis from './cache.js'
import { } from './containerUtils.js'
const app = express()

const port = 5001

app.get('/', (req, res) => {
    res.send("Hello")
})

app.listen(port, () => { console.log("listening at ", port) })