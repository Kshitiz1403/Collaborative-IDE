import React, { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext()

const AuthProvider = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [username, setUsername] = useState('')
    const [accessToken, setAccessToken] = useState('')

    const isLoggedIn = localStorage.getItem("accessToken")
    const usernameFromStorage = localStorage.getItem("username")

    useEffect(() => {
        setIsAuthenticated(isLoggedIn ? true : false)
        setUsername(usernameFromStorage)
        setAccessToken(isLoggedIn)
    }, [])

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, username, setUsername, accessToken, setAccessToken }}>
            {props.children}
        </AuthContext.Provider>
    )
}
export default AuthProvider