import React, { createContext, useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode'

export const AuthContext = createContext()

const AuthProvider = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [username, setUsername] = useState('')
    const [accessToken, setAccessToken] = useState('')

    const token = localStorage.getItem("accessToken")

    useEffect(() => {
        setIsAuthenticated(token ? true : false)
        if (token){
            const decoded = jwt_decode(token)
            setUsername(decoded.username)
            setAccessToken(token)
        }
        else if (accessToken){
            const decoded = jwt_decode(accessToken)
            setUsername(decoded.username)
        }
    }, [])

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, username, setUsername, accessToken, setAccessToken }}>
            {props.children}
        </AuthContext.Provider>
    )
}
export default AuthProvider