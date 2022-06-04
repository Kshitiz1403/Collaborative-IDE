import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Auth from '../Pages/Auth/Auth'
import Collaborate from '../Pages/Collaborate'
import Dashboard from '../Pages/Dashboard/Dashboard'
import HomePage from '../Pages/HomePage'
import Rooms from '../Pages/Rooms'
import useAuth from '../utils/useAuth'

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
      <Route path='/collaborate' element={<Collaborate />} />
    </Routes>
  )
}

export default CustomRoutes