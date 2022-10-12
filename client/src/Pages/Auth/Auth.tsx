import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import React, { useEffect, useState } from 'react'
import validator from 'validator'
import axios from 'axios'
import { API_URL } from '../../App'
import Snacker from '../../Components/Snacker/Snacker'
import { useLocation, useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import './Auth.css'
import { signup as signupService, login as loginService} from '../../api/authService'

const Auth = () => {

    const { setIsAuthenticated, setAccessToken, setUsername } = useAuth();

    let navigate = useNavigate()
    const { state } = useLocation()
    const [isLoggingIn, setIsLoggingIn] = useState(true)
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [errorMsg, setErrorMsg] = useState("")
    const [isErrorShown, setIsErrorShown] = useState(false);

    useEffect(() => {
        if (isLoggingIn) document.title = "Login"
        else document.title = "Signup"
    }, [isLoggingIn])

    const performChecks = () => {
        if (!validator.isEmail(email)) return false;
        return true;
    }

    const login = async () => {
        setIsErrorShown(false)
        try{
            const login = await loginService({username, password})
            setAccessToken(login.token)
            setIsAuthenticated(true)
            setUsername(username)
            navigate(state?.path || '/', { replace: true })
        }
        catch(err){
            setErrorMsg(err)
            showErrorModal()
        }
    }

    const signUp = async() => {
        setIsErrorShown(false)
        if (!performChecks()) {
            // show error modal
            setErrorMsg("Please enter valid email")
            showErrorModal()
            return
        }
        try{
            const token = await signupService({username, password, name, email})
            navigate(state?.path || '/', { replace: true })
            setIsAuthenticated(true)
            setUsername(username)
        }
        catch(e){
            setErrorMsg(e.error)
            showErrorModal()
        }
    }

    const showErrorModal = () => {
        setIsErrorShown(true)
        setTimeout(() => {
            setIsErrorShown(false)
        }, 3000);
    }


    return (
        <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center', backgroundColor: '#0E1525', flexDirection: 'column' }}>
            <form onSubmit={(e) => {
                e.preventDefault();
                isLoggingIn?login():signUp()
            }}>
            <Box
                sx={{
                    minWidth: 300,
                    minHeight: 300,
                    // backgroundColor: 'whitesmoke',
                    // borderColor: '#9e9c89',
                    // borderWidth: 2,
                    // borderStyle: 'solid',
                    display: 'flex',
                    flexDirection: 'column',
                    p: 4,
                    borderRadius: 2
                }}>
                <Typography variant='h6' style={{ textAlign: 'center', color: 'whitesmoke' }}>
                    {isLoggingIn ? "Log In" : "Signup"}
                </Typography>
                <TextField
                    onChange={event => setUserName(event.target.value)}
                    variant="outlined"
                    margin="normal"
                    required
                    id="username"
                    label="Username"
                    name="username"
                    value={username}
                    autoFocus
                    autoComplete='off'
                    size='small'
                    sx={{ backgroundColor: '#1c2333', }}

                    inputProps={{ sx: { color: 'whitesmoke', overflow: 'hidden' } }}
                    InputLabelProps={{
                        style: { color: "#9e9c89", },
                    }}
                />
                {!isLoggingIn && <TextField
                    onChange={event => setName(event.target.value)}
                    variant="outlined"
                    margin="normal"
                    required
                    id="name"
                    label="Name"
                    name="name"
                    size='small'
                    value={name}
                    inputProps={{ sx: { color: 'whitesmoke', backgroundColor: '#1c2333' } }}
                    InputLabelProps={{
                        style: { color: "#9e9c89" },
                    }}
                />}
                {!isLoggingIn && <TextField
                    onChange={event => setEmail(event.target.value)}
                    variant="outlined"
                    margin="normal"
                    required
                    id="email"
                    label="Email"
                    name="email"
                    size='small'
                    value={email}
                    inputProps={{ sx: { color: 'whitesmoke', backgroundColor: '#1c2333' } }}
                    InputLabelProps={{
                        style: { color: "#9e9c89" },
                    }}
                />}
                <TextField
                    onChange={event => setPassword(event.target.value)}
                    variant="outlined"
                    margin="normal"
                    required
                    id="password"
                    label="Password"
                    name="password"
                    type="password"
                    size='small'
                    inputProps={{ sx: { color: 'whitesmoke', background: '#1c2333' } }}
                    InputLabelProps={{
                        style: { color: "#9e9c89" },
                    }}
                />
                <Button type="submit" variant='contained' style={{ marginTop: 20, marginBottom: 20 }}>
                    {isLoggingIn? "Log In":"Sign up"}
                </Button>
                <Link onClick={() => setIsLoggingIn(!isLoggingIn)} style={{ cursor: 'pointer' }}>{isLoggingIn ? "Don't have an account? Sign up" : "Already have an account? Log in"}</Link>
            </Box>
            </form>
            <Snacker message={errorMsg} open={isErrorShown} onClose={showErrorModal} />
        </div>
    )
}

export default Auth