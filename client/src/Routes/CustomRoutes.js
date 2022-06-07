import React from 'react'
import { Route, Routes } from 'react-router-dom'
import useAuth from '../utils/useAuth'
import Auth from '../Pages/Auth/Auth'
import Collaborate from '../Pages/Collaborate'
import Dashboard from '../Pages/Dashboard/Dashboard'
import ErrorPage from '../Pages/ErrorPage'
import HomePage from '../Pages/HomePage'
import Join from '../Pages/Join/Join'
import Rooms from '../Pages/Rooms'
import RequireAuth from './RequireAuth'

const CustomRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path='/' element={<>
        {!isAuthenticated ?
          <HomePage />
          : <Dashboard />
        }
      </>
      } />
      <Route path='/auth' element={<Auth />} />
      <Route path='/rooms' element={<Rooms />} />
      <Route path='/@:username/:projectname' element={<RequireAuth><Collaborate /></RequireAuth>} />
      <Route path='/join/:id' element={<Join />} />
      <Route path='*' element={<ErrorPage />} />
    </Routes>
  )
}

export default CustomRoutes