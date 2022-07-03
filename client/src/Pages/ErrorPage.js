import React from 'react'
import { useLocation } from 'react-router-dom'
import colors from '../constants/colors'

const ErrorPage = () => {
  const { state } = useLocation()
  return (
    <div style={{ height: '100vh', backgroundColor: colors.dark, display: 'flex', flexDirection: 'column', color: 'whitesmoke', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ color: 'red' }}>
        404
      </div>
      {state?.error &&
        <div>
          {state.error}
        </div>
      }
    </div>
  )
}

export default ErrorPage