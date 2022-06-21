import fsPromises from 'fs/promises'
import fse from 'fs-extra'

const rootFolder = "/mnt/projects"

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

export const saveDataToFileUtil = (username, projectName, relativeFilePath, data) => {
    return new Promise((resolve, reject) => {
        const fPath = `${rootFolder}/${username}/${projectName}/${relativeFilePath}`

        fse.outputFile(fPath, data)
            .then(() => {
                return resolve({ code: "The file has been saved" })
            })
            .catch(err => {
                return reject({ error: err })
            })
    })
}