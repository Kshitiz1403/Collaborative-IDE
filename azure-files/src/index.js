import express from 'express'
import fileRoutes from './routes/FileRoutes.js'
import treeRoutes from './routes/TreeRoutes.js'
import cors from 'cors'

const app = express()

app.use(express.json())

app.use(cors({
    origin:'*'
}))

app.get('/', (req, res)=>res.send("Yo wassup!"))

app.listen(5000, () =>{
    console.log("listening at 5000")
})

app.use('/files', fileRoutes);
app.use('/tree', treeRoutes)