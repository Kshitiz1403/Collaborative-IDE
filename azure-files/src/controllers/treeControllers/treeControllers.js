import dirTree from 'directory-tree'

const rootFolder = "/mnt/projects"

export const getTree = (req, res) => {
    const { username, projectName } = req.query
    console.log(username, projectName)
    const tree = dirTree(`${rootFolder}/${username}/${projectName}`)
    const treeWalker = (treeObject) => {
        if (treeObject.type == "directory") {
            treeObject.type = "folder"
        }
        if (treeObject.hasOwnProperty('children')) {
            treeObject["files"] = treeObject["children"]
            delete treeObject["children"]
            treeObject["files"].forEach(child => {
                treeWalker(child)
            });
        }
    }
    treeWalker(tree)
    res.send({code: JSON.stringify(tree)})
}