import React, { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext()

const AuthProvider = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const isLoggedIn = localStorage.getItem("accessToken")

    useEffect(() => {
        setIsAuthenticated(isLoggedIn ? true : false)
    }, [])

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {props.children}
        </AuthContext.Provider>
    )
}
export default AuthProvider