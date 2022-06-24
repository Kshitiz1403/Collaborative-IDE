import useAxios from "./useAxios"
import useProject from "./useProject"

const useInviteLink = () => {
    const api = useAxios()

    const { activeProjectName } = useProject()

    const getInviteLink = () => {
        return new Promise((resolve, reject) => {
            api.get('/share/get', {
                params: {
                    projectName: activeProjectName
                }
            })
                .then(res => resolve(res.data))
                .catch(err => reject(err))
        })
    }

    const generateInviteLink = () => {
        return new Promise((resolve, reject) => {
            api.post('/share/create', {
                projectName: activeProjectName
            })
                .then(res => resolve(res.data))
                .catch(err => reject(err))
        })
    }

    const generateIfNotPresent = () => {
        return new Promise((resolve, reject) => {
            getInviteLink()
                .then(res => {
                    if (res.share) {
                        return resolve(res)
                    }
                    generateInviteLink()
                        .then(result => resolve(result))
                        .catch(error => reject(error))
                })
                .catch(err => reject(err))
        })
    }

    return { getInviteLink, generateInviteLink, generateIfNotPresent }
}

export default useInviteLink