import useAzure from "./useAzure"

const useFiles = () => {
    const azure = useAzure()

    const deleteByPath = (path) => {
        return new Promise((resolve, reject) => {
            azure.post('/files/delete', {
                path: path
            }).then(result => {
                return resolve(result)
            }).catch(err => {
                return reject(err)
            })
        })
    }

    const deleteFile = (username, projectName, relativePath) => {
        return new Promise((resolve, reject) => {
            azure.post('/files/delete', {
                path: relativePath,
                username,
                projectName
            }).then(result => {
                return resolve(result)
            }).catch(err => {
                return reject(err)
            })
        })
    }
    const createFolderByPath = (path) => {
        return new Promise((resolve, reject) => {
            azure.post('/files/create', {
                path: path
            }).then(result => {
                return resolve(result)
            }).catch(err => {
                return reject(err)
            })
        })
    }

    const createFolder = (username, projectName, relativePath) => {
        return new Promise((resolve, reject) => {
            azure.post('/files/create', {
                username: username,
                projectName: projectName,
                path: relativePath
            }).then(result => {
                return resolve(result)
            }).catch(err => {
                return reject(err)
            })
        })
    }

    const saveOrCreateFileByPath = (path, data = "") => {
        return new Promise((resolve, reject) => {
            azure.put('/files/save', {
                path: path,
                data: data
            }).then(result => {
                return resolve(result)
            }).catch(err => {
                return reject(err)
            })
        })
    }

    const saveOrCreateFile = (username, projectName, relativePath, data = "") => {
        return new Promise((resolve, reject) => {
            azure.put('/files/save', {
                username: username,
                projectName: projectName,
                path: relativePath,
                data: data
            }).then(result => {
                return resolve(result)
            }).catch(err => {
                return reject(err)
            })
        })
    }

    const renameByPath = (oldPath, newPath) => {
        return new Promise((resolve, reject) => {
            azure.patch('/files/rename', {
                oldPath: oldPath,
                newPath: newPath
            }).then(result => {
                return resolve(result)
            }).catch(err => {
                return reject(err)
            })
        })
    }
    const rename = (username, projectName, oldPath, newPath) => {
        return new Promise((resolve, reject) => {
            azure.patch('/files/rename', {
                username: username,
                projectName: projectName,
                oldPath,
                newPath
            }).then(result => {
                return resolve(result)
            }).catch(err => {
                return reject(err)
            })
        })
    }

    return { deleteByPath, deleteFile, createFolderByPath, createFolder, saveOrCreateFileByPath, saveOrCreateFile, renameByPath, rename }
}

export default useFiles;