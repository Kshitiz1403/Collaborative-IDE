import fsPromises from 'fs/promises'
import fse from 'fs-extra'

const rootFolder = process.env.rootFolder


export const deleteByPathUtil = (path) => {
    return new Promise((resolve, reject) => {
        fsPromises.rm(path, { force: true, recursive: true })
            .then(() => {
                return resolve({ code: "deleted" })
            })
            .catch(err => {
                return reject({ error: err })
            })
    })
}

export const deleteDirectoryOrFileUtil = (username, projectName, relativeFilePath) => {
    return new Promise((resolve, reject) => {
        const dPath = `${rootFolder}/${username}/${projectName}/${relativeFilePath}`
        fsPromises.rm(dPath, { force: true, recursive: true })
            .then(result => {
                return resolve({ code: "deleted" })
            })
            .catch(err => {
                return reject({ error: err })
            })
    })
}

export const createFolderByPathUtil = (path) => {
    return new Promise((resolve, reject) => {
        fse.ensureDir(path)
            .then(() => {
                return resolve("Folder created or already exists")
            })
            .catch(err => {
                return reject(err)
            })
    })
}

export const createFolderUtil = (username, projectName, relativeFolderPath) => {
    return new Promise((resolve, reject) => {
        const folderPath = `${rootFolder}/${username}/${projectName}/${relativeFolderPath}`

        fse.ensureDir(folderPath)
            .then(() => {
                return resolve("Folder created or already exists")
            })
            .catch((err) => {
                return reject(err)
            })
    })
}

export const saveDataToFileByPathUtil = (path, data) => {
    return new Promise((resolve, reject) => {
        fse.outputFile(path, data)
            .then(() => {
                return resolve("The file has been saved")
            })
            .catch(err => {
                return reject(err)
            })
    })
}

export const saveDataToFileUtil = (username, projectName, relativeFilePath, data) => {
    return new Promise((resolve, reject) => {
        const fPath = `${rootFolder}/${username}/${projectName}/${relativeFilePath}`

        fse.outputFile(fPath, data)
            .then(() => {
                return resolve("The file has been saved")
            })
            .catch(err => {
                return reject(err)
            })
    })
}

export const renameByPathUtil = (oldPath, newPath) => {
    return new Promise((resolve, reject) => {
        fsPromises.rename(oldPath, newPath)
            .then(() => {
                return resolve("Renamed")
            }).catch(err => {
                return reject(err)
            })
    })
}

export const renameUtil = (username, projectName, oldRelativePath, newRelativePath) => {
    return new Promise((resolve, reject) => {
        let oldPath = `${rootFolder}/${username}/${projectName}/${oldRelativePath}`
        let newPath = `${rootFolder}/${username}/${projectName}/${newRelativePath}`
        fsPromises.rename(oldPath, newPath)
            .then(() => {
                return resolve("Renamed")
            }).catch(err => {
                return reject(err)
            })
    })
}

export const readFileUtil = (username, projectName, relativeFilePath) => {
    return new Promise((resolve, reject) => {
        const fPath = `${rootFolder}/${username}/${projectName}/${relativeFilePath}`
        return resolve(fse.readFileSync(fPath, { encoding: 'utf-8' }))
    })
}