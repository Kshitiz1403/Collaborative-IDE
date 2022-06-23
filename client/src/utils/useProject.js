import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useAxios from "./useAxios";

const useProject = () => {
    const location = useLocation();
    const [activeProjectName, setActiveProjectname] = useState('')
    const [adminUsername, setAdminUsername] = useState('')

    const api = useAxios()

    useEffect(() => {
        if (location.pathname.startsWith('/@')) {
            // Set project name only when we are on the collaborate screen
            setActiveProjectname(getProjectNameIfCollaborate(location.pathname))
            setAdminUsername(getUserNameIfCollaborate(location.pathname))
        }
        else if (location.pathname.startsWith('/join')) {
            const shareIdentifier = getProjectNameIfJoin(location.pathname)
            getProjectDetailsFromShare(shareIdentifier)
        }
    }, [location])

    const getUserNameIfCollaborate = (string) => {
        return string.split('@')[1].split('/')[0]
    }

    const getProjectNameIfCollaborate = (pathname) => {
        return pathname.split('@')[1].split('/')[1];
    }

    const getProjectNameIfJoin = (pathname) => {
        return pathname.split('/').slice(-1)[0];
    }


    const getProjectDetailsFromShare = (shareIdentifier) => {
        api.get('/share/details', {
            params: {
                share: shareIdentifier
            }
        }).then(result => {
            const data = result.data;
            setActiveProjectname(data.name)
            setAdminUsername(data.username)
        }).catch(err => console.error(err))
    }

    return { activeProjectName, adminUsername }
}

export default useProject;