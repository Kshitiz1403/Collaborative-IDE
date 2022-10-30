import React, { Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import Loading from '../Components/Loading'
import ErrorPage from '../Pages/ErrorPage'
import RequireAuth from './RequireAuth'

const HomePage = React.lazy(() => import('../Pages/HomePage'))
const Join = React.lazy(() => import('../Pages/Join/Join'))
const Reset = React.lazy(() => import('../Pages/ResetPassword'))
const Dashboard = React.lazy(() => import('../Pages/Dashboard/Dashboard'))
const Collaborate = React.lazy(() => import('../Pages/Collaborate'))
const Auth = React.lazy(() => import('../Pages/Auth/Auth'))
const Forgot = React.lazy(() => import('../Pages/ForgotPassword'))


const CustomRoutes = () => {
  const { loggingIn, isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path='/' element={<>
            {loggingIn && <Loading />}
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
      </Suspense>
    </BrowserRouter>
  )
}

export default CustomRoutes