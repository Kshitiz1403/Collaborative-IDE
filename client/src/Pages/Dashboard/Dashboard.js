import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import TextField from '@mui/material/TextField'
import Modal from '@mui/material/Modal'
import Box from '@mui/system/Box'
import Button from '@mui/material/Button'
import Snacker from '../../Components/Snacker/Snacker'
import CreateLanguageBox from '../../Components/LanguageBox/CreateLanguageBox'
import useAuth from '../../hooks/useAuth'
import useProject from '../../hooks/useProject'

const Dashboard = () => {

    const navigate = useNavigate();

    const { username } = useAuth()
    const [isOpen, setIsOpen] = useState(false)
    const [selectedLanguage, setSelectedLanguage] = useState('')
    const [projectName, setProjectName] = useState('')
    const [isSuccess, setIsSuccess] = useState(false)
    const [isError, setIsError] = useState(false)
    const [successMsg, setSuccessMsg] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const [myProjects, setMyProjects] = useState([])

    const projectHook = useProject();

    const handleClose = () => {
        setIsOpen(false)
        setProjectName('')
    }
    const handleOpen = (language) => {
        setSelectedLanguage(language)
        setIsOpen(true)
    }

    const handleCreateProject = () => {
        projectHook.createProject(projectName, selectedLanguage).then(result => {
            setSuccessMsg(result.data)
            setIsSuccess(true)
            navigate(`/@${username}/${projectName}`)
        }).catch(err => {
            setErrorMsg(err.response.data.error)
            setIsError(true)
        })
    }

    useEffect(() => {
        projectHook.getProjects()
            .then(res => setMyProjects(res.data.code))
            .catch(err => {
                setIsError(true)
                setErrorMsg(err.response.data.error)
            })
    }, [])

    return (
        <>
            <Modal open={isOpen} onClose={handleClose}  >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 'fit-content',
                    bgcolor: 'whitesmoke',
                    borderRadius: 2,
                    boxShadow: 24,
                    p: 2,
                    height: 200,
                    display: 'flex'
                }}>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <h2 style={{ margin: 0 }}>Create a {selectedLanguage} project</h2>
                        <div>
                            <h3 style={{ marginBottom: 2, fontWeight: 'normal' }}>Title</h3>
                            <TextField
                                autoFocus
                                variant='outlined'
                                fullWidth
                                size='small'
                                placeholder='Name your project'
                                value={projectName}
                                sx={{ backgroundColor: '#f0f1f2' }}
                                onChange={(e) => setProjectName(e.target.value)}
                            />
                        </div>
                        <Button variant='contained' size='small' onClick={handleCreateProject}>Create Project</Button>
                    </div>
                </Box>
            </Modal>


            <div style={{ display: 'flex', height: '100vh', backgroundColor: "#ebeced" }}>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div>
                        Create Project
                    </div>
                    <Snacker open={isSuccess} autoHideDuration={3000} onClose={() => setIsSuccess(false)} severity='success' message={successMsg} />
                    <Snacker open={isError} message={errorMsg} autoHideDuration={3000} onClose={() => setIsError(false)} />
                    <CreateLanguageBox
                        languages={[
                            { language: 'c++', onClick: () => handleOpen('c++') },
                            { language: 'python', onClick: () => handleOpen('python') },
                            { language: 'java', onClick: () => handleOpen('java') },
                            { language: 'nodejs', onClick: () => handleOpen('nodejs') }
                        ]}
                    />
                    <div>
                        My Projects
                        {myProjects.map(({ name, language }) => <div key={name}>{name} {language}</div>)}
                    </div>
                </div>
            </div>
        </>

    )
}

export default Dashboard