import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { languageDefaultFile } from "../constants/languageDefaultFile";
import { ProjectContext } from "../contexts/ProjectContext";
import useAuth from "./useAuth";
import useAxios from "./useAxios";
import useAzure from "./useAzure";

const useProject = () => {
    const location = useLocation();
    const { adminUsername, setAdminUsername, activeProjectName, setActiveProjectname, activeProjectLanguage, setActiveProjectLanguage } = useContext(ProjectContext)
    const { username } = useAuth()

    const api = useAxios()
    const azure = useAzure()
    const navigate = useNavigate()

    useEffect(() => {
        if (location.pathname.startsWith('/@')) {
            // Set project name only when we are on the collaborate screen

            // allow only authenticated user to access their "own" project
            // else throw error like -> permission not allowed... 

            // console.log(getUserNameIfCollaborate(location.pathname))
            if (username && getUserNameIfCollaborate(location.pathname)) {
                if (username === getUserNameIfCollaborate(location.pathname)) {
                    checkProjectExist(getProjectNameIfCollaborate(location.pathname))
                } else {
                    navigate('/404', { state: { error: "Unauthorized access. You don't have access to the request project." } })
                }
            }
        }
        else if (location.pathname.startsWith('/join')) {
            const shareIdentifier = getProjectNameIfJoin(location.pathname)
            getProjectDetailsFromShare(shareIdentifier)
        }
    }, [location, username])

    const getUserNameIfCollaborate = (string) => {
        return string.split('@')[1].split('/')[0]
    }

    const getProjectNameIfCollaborate = (pathname) => {
        return pathname.split('@')[1].split('/')[1];
    }

    const getProjectNameIfJoin = (pathname) => {
        return pathname.split('/').slice(-1)[0];
    }

    const checkProjectExist = (projectName) => {
        getProjectDetails(projectName).then(result => {
            setActiveProjectLanguage(result.data.code.language)
            setActiveProjectname(getProjectNameIfCollaborate(location.pathname))
            setAdminUsername(getUserNameIfCollaborate(location.pathname))
        }).catch(err => {
            console.log(err.response.data.error)
            navigate('/404', { state: { error: `Project name ${projectName} does not exists` } })
        })
    }

    const createDefaultFile = (language, projectName) => {
        return new Promise((resolve, reject) => {
            azure.put('/files/save', {
                "username": username,
                "projectName": projectName,
                "path": languageDefaultFile(language)
            }).then(result => resolve(result)).catch(err => reject(err))
        })
    }

    const createProject = (projectName, language) => {
        return new Promise((resolve, reject) => {
            api.post('/create', {
                "projectName": projectName,
                "language": language
            })
                .then(result => {
                    createDefaultFile(language, projectName)
                        .then(() => resolve(result))
                        .catch(err => reject(err))
                })
                .catch(err => reject(err))
        })
    }
    const getProjects = () => {
        return new Promise((resolve, reject) => {
            api.get('/all').then(result => {
                return resolve(result.data.code);
            }).catch(err => {
                return reject(err);
            })
        })
    }

    const getProjectDetails = (projectName) => {
        return new Promise((resolve, reject) => {
            api.get('/project', {
                params: {
                    "projectName": projectName
                }
            })
                .then(result => resolve(result))
                .catch(err => reject(err))
        })
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

    const isShareIDPresent = (shareID) => {
        return new Promise((resolve, reject) => {
            api.get("/share/isValid", {
                params: {
                    share: shareID
                }
            })
                .then(res => resolve(true))
                .catch(err => reject(false))
        })
    }

    return { activeProjectName, adminUsername, getProjects, getProjectDetails, isShareIDPresent, createProject, activeProjectLanguage, setActiveProjectLanguage }
}

export default useProject;