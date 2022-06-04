import React from 'react'
import Button from '@mui/material/Button'
import CodeIcon from '@mui/icons-material/Code';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    let navigate = useNavigate()

    const handleOnIDE = () => {
        navigate('/rooms')
    }

    const handleOnAuth = () =>{
        navigate('/auth')
    }

    return (
        <div style={{ display: 'flex', flexGrow: 1, height: '100vh', justifyContent: 'center', alignItems: 'center', backgroundColor: '#0E1525' }}>
            <div style={{ display: 'flex', flexDirection: 'column', }}>
                <Button variant="contained" style={{ paddingTop: 10, paddingBottom: 10, marginBottom: 10 }} onClick={handleOnIDE}><CodeIcon style={{ marginRight: 5 }} /> Online IDE</Button>
                <Button variant="outlined" onClick={handleOnAuth} style={{ paddingTop: 10, paddingBottom: 10, }}>Signup/Login</Button>
            </div>

        </div>
    )
}

export default HomePage