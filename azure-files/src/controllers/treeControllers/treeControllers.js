import dirTree from 'directory-tree'
const rootFolder = process.env.rootFolder

export const getTree = (req, res) => {
    try {
        const { username, projectName } = req.query
        const path = `${rootFolder}/${username}/${projectName}/`

        const tree = dirTree(path, { attributes: ["type"] })
        const treeWalker = (treeObject) => {
            if (treeObject.type == "directory") {
                treeObject.type = "folder"
            }
            delete treeObject.path
            if (treeObject.hasOwnProperty('children')) {
                treeObject["files"] = treeObject["children"]
                delete treeObject["children"]
                treeObject["files"].forEach(child => {
                    treeWalker(child)
                });
            }
        }
        treeWalker(tree)
        res.send({ code: JSON.stringify(tree) })
    }
    catch (err) {
        res.status(400).send({ error: err.toString() })
    }
}