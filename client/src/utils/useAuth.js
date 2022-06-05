import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

const useAuth = () => {
    const { isAuthenticated, setIsAuthenticated, username, setUsername, accessToken } = useContext(AuthContext);
    return { isAuthenticated, setIsAuthenticated, username, setUsername, accessToken };
}

export default useAuth