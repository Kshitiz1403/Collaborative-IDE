import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Collaborate from '../Pages/Collaborate'
import HomePage from '../Pages/HomePage'
import Rooms from '../Pages/Rooms'

const CustomRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/rooms' element={<Rooms />} />
      <Route path='/collaborate' element={<Collaborate/>} />
    </Routes>
  )
}

export default CustomRoutes