import express from 'express'
import redis from './cache.js'
import { compileRoutes, containerRoutes } from './routes/index.js'

const app = express()

app.use(express.json())

const port = 5001

app.get('/', (req, res) => {
    res.send("Hello")
})

app.use('/container', containerRoutes)
app.use('/compile', compileRoutes)

app.listen(port, () => { console.log("listening at ", port) })