import projectsShareClient from '../shareClient.js'

export const createUserDirectory = async (dirName) => {
    return new Promise((resolve, reject) => {
        const directorClient = projectsShareClient.getDirectoryClient(dirName)
        directorClient.createIfNotExists().then(res => {
            resolve(`directory created for ${dirName} successfully`)
        }).catch(err => {
            reject((err.code).toString())
        })
    })
}

