import useAzure from "./useAzure"
import useProject from "./useProject"

const useFiles = () => {
    const azure = useAzure()
    const { adminUsername, activeProjectName } = useProject()

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

    const deleteFile = (relativePath) => {
        return new Promise((resolve, reject) => {
            azure.post('/files/delete', {
                path: relativePath,
                username: adminUsername,
                projectName: activeProjectName
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

    const createFolder = (relativePath) => {
        return new Promise((resolve, reject) => {
            azure.post('/files/create', {
                username: adminUsername,
                projectName: activeProjectName,
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

    const saveOrCreateFile = (relativePath, data = "") => {
        return new Promise((resolve, reject) => {
            azure.put('/files/save', {
                username: adminUsername,
                projectName: activeProjectName,
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
    const rename = (oldPath, newPath) => {
        return new Promise((resolve, reject) => {
            azure.patch('/files/rename', {
                username: adminUsername,
                projectName: activeProjectName,
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