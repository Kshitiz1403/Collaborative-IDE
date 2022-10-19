import useAzure from "./useAzure";
import useProjectService from "../api/projectService";

const useTree = () => {
    const azure = useAzure()
    const { adminUsername, activeProjectName } = useProjectService()
    const getTree = ():Promise<any> => {
        return new Promise((resolve, reject) => {
            azure.get(`/tree?username=${adminUsername}&projectName=${activeProjectName}`)
                .then(result => {
                    return resolve(JSON.parse(result.data.code).files)
                })
                .catch(err => {
                    return reject(err)
                })
        })
    }
    return { getTree }
}

export default useTree