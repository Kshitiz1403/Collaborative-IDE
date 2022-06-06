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

export const createProjectDirectoryUtil = (username, projectname, language) => {
    return new Promise((resolve, reject) => {
        const userDirectory = projectsShareClient.getDirectoryClient(username)
        const projectDirectory = userDirectory.getDirectoryClient(projectname)
        projectDirectory.create()
            .then(res => {
                projectDirectory.setMetadata({ 'language': language })
                    .then(response => resolve(`Project Directory created at ${projectname} for user ${username}`)
                    )
                    .catch(err => {
                        reject((err.code).toString())
                    })
            })
            .catch(err => {
                reject((err.code).toString())
            })
    })
}