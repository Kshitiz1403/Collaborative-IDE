import { compileCppUtil, compileJavaUtil, compilePythonUtil } from "./compileUtils.js"

export const compileJava = (req, res) => {
    const { username, projectName, fileName } = req.body
    compileJavaUtil(username, projectName, fileName)
        .then(result => res.send({ code: result }))
        .catch(err => res.status(400).send({ error: err }))
}

export const compileCpp = (req, res) => {
    const { username, projectName, fileName } = req.body
    compileCppUtil(username, projectName, fileName)
        .then(result => res.send({ code: result }))
        .catch(err => res.status(400).send({ error: err }))
}

export const compilePython = (req, res) => {
    const { username, projectName, fileName } = req.body
    compilePythonUtil(username, projectName, fileName)
        .then(result => res.send({ code: result }))
        .catch(err => res.status(400).send({ error: err }))
}