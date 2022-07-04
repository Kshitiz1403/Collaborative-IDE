import { createContainerUtil, executeInContainer, stopAndDeleteContainer } from "../containerControllers/containerUtils.js"

const compileJavaUtil = (adminUsername, projectName, javaClassName) => {
    return new Promise((resolve, reject) =>
        createContainerUtil(adminUsername, projectName)
            .then(() => executeInContainer(adminUsername, projectName, `javac ${javaClassName}.java && java ${javaClassName} && rm ${javaClassName}.class`)
                .then(data => resolve(data))
                .catch(err => reject(err))
                .finally(() => stopAndDeleteContainer(adminUsername, projectName)
                    .catch(err => reject(err)))
            )
            .catch(err => reject(err))
    )
}

const compileCppUtil = (adminUsername, projectName, cppFileName) => {
    return new Promise((resolve, reject) =>
        createContainerUtil(adminUsername, projectName)
            .then(() => executeInContainer(adminUsername, projectName, `g++ ${cppFileName}.cpp -o ${cppFileName} && ./${cppFileName} && rm ${cppFileName}`)
                .then(data => resolve(data))
                .catch(err => reject(err))
                .finally(() => stopAndDeleteContainer(adminUsername, projectName)
                    .catch(err => reject(err)))
            )
            .catch(err => reject(err))
    )
}

const compilePythonUtil = (adminUsername, projectName, pythonFileName) => {
    return new Promise((resolve, reject) =>
        createContainerUtil(adminUsername, projectName)
            .then(() => executeInContainer(adminUsername, projectName, `python ${pythonFileName}.py`)
                .then(data => resolve(data))
                .catch(err => reject(err))
                .finally(() => stopAndDeleteContainer(adminUsername, projectName)
                    .catch(err => reject(err)))
            )
            .catch(err => reject(err))
    )
}

export { compileJavaUtil, compileCppUtil, compilePythonUtil }