import { createContext, useEffect, useState } from 'react'
import { getUserFromToken } from '../api/authService'

export const AuthContext = createContext(null)

const AuthProvider = (props:any) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [username, setUsername] = useState('')
    const [accessToken, setAccessToken] = useState('')

    useEffect(() => {
        console.log("Auth Context reloaded")
        const token = localStorage.getItem("accessToken") || accessToken;
        (async() => {
            const user = await getUserFromToken(token);
            setUsername(user.username);
            setAccessToken(token);
            setIsAuthenticated(true);
        })()
    }, [])

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, username, setUsername, accessToken, setAccessToken }}>
            {props.children}
        </AuthContext.Provider>
    )
}
export default AuthProvider