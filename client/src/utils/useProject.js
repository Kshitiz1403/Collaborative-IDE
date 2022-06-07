import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const useProject = () => {
    const location = useLocation();
    const [activeProjectName, setActiveProjectname] = useState('')

    useEffect(() => {
        setActiveProjectname(getProjectName(location.pathname))
    }, [location])


    const getProjectName = (string) => {
        const everythingAfterAT = string.split('@')[1];
        const projectName = everythingAfterAT.split('/')[1];
        return projectName;
    }

    return { activeProjectName }
}

export default useProject;