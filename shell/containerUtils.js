import { docker } from "./docker.js";
import client from "./cache.js";

const promisifyStream = (stream, result) => new Promise((resolve, reject) => {
    stream.on('data', data => result.str += (data.toString()))
    stream.on('end', resolve)
    stream.on('error', reject)
});

const createContainer = (adminUsername, projectName) => {
    return new Promise((resolve, reject) => {
        let _container
        docker.container.create({
            Image: "defaultimg",
            WorkingDir: `/${projectName}`,
            HostConfig: {
                "Binds": [`/home/kshitizagrawal/Documents/Collaborative-IDE/projects/${adminUsername}/${projectName}:/${projectName}`],
            },
            Memory: 2e8,
        })
            .then(container => { _container = container; return container.start() })
            .then(container => client.hSet(adminUsername, projectName, container.data.Id))
            .then(() => resolve(_container.data.Id))
            .catch(err => reject(err))
    })
}

const executeInContainer = async (adminUsername, projectName, command) => {
    return new Promise(async (resolve, reject) => {
        let _container
        let result = { str: "" }
        const containerID = await client.hGet(adminUsername, projectName);
        _container = docker.container.get(containerID)
        _container.exec.create({
            AttachStdout: true,
            AttachStderr: true,
            Cmd: ["bash", "-c", `${command}`]
        })
            .then(exec => exec.start({ Detach: false }))
            .then(stream => promisifyStream(stream, result))
            .then(() => resolve(result.str))
            .catch(err => reject(err))
    })
}

const stopAndDeleteContainer = async (adminUsername, projectName) => {
    return new Promise(async (resolve, reject) => {
        let _container
        const containerID = await client.hGet(adminUsername, projectName);
        _container = docker.container.get(containerID)
        _container.stop()
            .then(container => container.delete({ force: true }))
            .then(() => client.hDel(adminUsername, projectName))
            .then(() => resolve(containerID))
            .catch(err => reject(err))
    })
}

const compileJava = (adminUsername, projectName, javaClassName) => {
    return new Promise((resolve, reject) => {
        executeInContainer(adminUsername, projectName, `javac ${javaClassName}.java && java ${javaClassName} && rm ${javaClassName}.class`)
            .then(data => resolve(data))
            .catch(err => reject(err))
    })
}

const compileCpp = (adminUsername, projectName, cppFileName) => {
    return new Promise((resolve, reject) => {
        executeInContainer(adminUsername, projectName, `g++ ${cppFileName}.cpp -o ${cppFileName} && ./${cppFileName}`)
            .then(data => resolve(data))
            .catch(err => reject(err))
    })
}

const compilePython = (adminUsername, projectName, pythonFileName) => {
    return new Promise((resolve, reject) => {
        executeInContainer(adminUsername, projectName, `python ${pythonFileName}.py`)
            .then(data => resolve(data))
            .catch(err => reject(err))
    })
}

export {
    createContainer, executeInContainer, stopAndDeleteContainer, compileJava, compileCpp, compilePython
}