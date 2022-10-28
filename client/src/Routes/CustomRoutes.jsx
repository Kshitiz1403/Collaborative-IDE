import React from 'react'
import { BrowserRouter, Route, Router, Routes, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import Auth from '../Pages/Auth/Auth'
import Collaborate from '../Pages/Collaborate'
import Dashboard from '../Pages/Dashboard/Dashboard'
import ErrorPage from '../Pages/ErrorPage'
import Forgot from '../Pages/ForgotPassword'
import HomePage from '../Pages/HomePage'
import Join from '../Pages/Join/Join'
import Reset from '../Pages/ResetPassword'
import RequireAuth from './RequireAuth'
import CircularProgress from '@mui/material/CircularProgress';
import colors from '../constants/colors'
import styles from './routes.module.css'

const CustomRoutes = () => {
  const { loggingIn, isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<>
          {loggingIn && <div style={{ backgroundColor: colors.dark }} className={styles.loading}><CircularProgress /></div>}
          {!loggingIn && (!isAuthenticated ?
            <HomePage />
            : <Dashboard />)
          }
        </>
        } />
        <Route path='/auth' element={<Auth />} />
        <Route path='/forgot' element={<Forgot />} />
        <Route path='/reset/*' element={<Reset />} />
        <Route path='/@:username/:projectname' element={<RequireAuth><Collaborate /></RequireAuth>} />
        <Route path='/join/:id' element={<Join />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default CustomRoutes