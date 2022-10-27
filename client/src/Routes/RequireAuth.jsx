import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import { Navigate, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import colors from '../constants/colors';

const RequireAuth = ({ children }) => {
    const location = useLocation()
    const { isAuthenticated, loggingIn } = useAuth();

    if (loggingIn) {
        return <div
            style={{
                display: 'flex',
                flexGrow: 1,
                height: '100vh',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: colors.dark,
                color: 'whitesmoke',
            }}
        >
            <CircularProgress />
        </div>
    }

    return (isAuthenticated ? children : <Navigate to="/auth" replace state={{ path: location.pathname }} />)
}

export default RequireAuth