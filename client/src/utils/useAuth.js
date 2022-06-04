import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

const useAuth = () => {
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
    return { isAuthenticated, setIsAuthenticated };
}

export default useAuth