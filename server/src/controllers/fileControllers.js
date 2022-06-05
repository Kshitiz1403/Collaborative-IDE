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



export const createProjectDirectory = (req, res) => {
    const createProjectDirectoryUtil = (username, projectname) => {
        return new Promise((resolve, reject) => {
            const userDirectory = projectsShareClient.getDirectoryClient(username)
            const projectDirectory = userDirectory.getDirectoryClient(projectname)
            projectDirectory.create().then(res => {
                resolve(`Project Directory created at ${projectname} for user ${username}`)
            })
                .catch(err => {
                    reject((err.code).toString())
                })
        })
    }

    const { username, projectname } = req.body
    createProjectDirectoryUtil(username, projectname).then(response => {
        console.log(response)
        return res.send(response)
    }).catch(err => {
        console.error(err)
        return res.status(400).send(err)
    })
}