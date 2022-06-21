import fsPromises from 'fs/promises'
const rootFolder = "/mnt/projects"

export const deleteDirectoryOrFileUtil = (username, projectName, directoryPath) => {
    return new Promise((resolve, reject) => {
        const path = `${rootFolder}/${username}/${projectName}/${directoryPath}`
        fsPromises.rm(path, { force: true, recursive: true })
            .then(result => {
                return resolve({ code: "deleted" })
            })
            .catch(err => {
                return reject(err)
            })
    })
}
