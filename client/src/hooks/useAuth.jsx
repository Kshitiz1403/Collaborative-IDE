import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

const useAuth = () => {
    const { isAuthenticated, setIsAuthenticated, username, setUsername, accessToken, setAccessToken, loggingIn } = useContext(AuthContext);
    return { isAuthenticated, setIsAuthenticated, username, setUsername, accessToken, setAccessToken, loggingIn };
}

export default useAuth