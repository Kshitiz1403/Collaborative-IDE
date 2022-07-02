import { createContainerUtil, executeInContainer, stopAndDeleteContainer } from "./containerUtils.js"

export const createContainer = (req, res) => {
    const { username, projectName } = req.body
    createContainerUtil(username, projectName)
        .then(containerID => res.send({ id: containerID }))
        .catch(err => res.status(400).send({ error: err }))
}

export const execute = (req, res) => {
    const { username, projectName, command } = req.body
    executeInContainer(username, projectName, command)
        .then(result => res.send({ code: result }))
        .catch(err => res.status(400).send({ error: err }))
}

export const stopAndDelete = (req, res) => {
    const { username, projectName } = req.body
    stopAndDeleteContainer(username, projectName)
        .then(containerID => res.send({ id: containerID }))
        .catch(err => res.status(400).send({ error: err }))
}

