import { createContext, useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode'

export const AuthContext = createContext(null)

const AuthProvider = (props:any) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [username, setUsername] = useState('')
    const [accessToken, setAccessToken] = useState('')

    const token = localStorage.getItem("accessToken")

    useEffect(() => {
        console.log("Auth Context reloaded")
        setIsAuthenticated(token ? true : false)
        if (token){
            const decoded:any = jwt_decode(token)
            setUsername(decoded['username'])
            setAccessToken(token)
        }
        else if (accessToken){
            const decoded:any = jwt_decode(accessToken)
            setUsername(decoded['username'])
        }
    }, [])

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, username, setUsername, accessToken, setAccessToken }}>
            {props.children}
        </AuthContext.Provider>
    )
}
export default AuthProvider