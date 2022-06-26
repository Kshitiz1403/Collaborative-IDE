import React, { createContext, useState } from 'react'

export const ProjectContext = createContext()

const ProjectProvider = (props) => {
    const [adminUsername, setAdminUsername] = useState('')
    const [activeProjectName, setActiveProjectname] = useState('')

    return (
        <ProjectContext.Provider value={{ adminUsername, setAdminUsername, activeProjectName, setActiveProjectname }}>
            {props.children}
        </ProjectContext.Provider>
    )
}

export default ProjectProvider