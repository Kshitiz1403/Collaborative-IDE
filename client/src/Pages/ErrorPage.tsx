import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import colors from '../constants/colors'
import errorImage from '../assets/404-landing-image.png'

const ErrorPage = () => {
  const { state } = useLocation()
  useEffect(() => {
    document.title = "Page not found"
  }, [])

  return (
    <div style={{ height: '100vh', backgroundColor: colors.dark, display: 'flex', color: 'whitesmoke', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ flex: 0.25 }}>
        <img src={errorImage} style={{ width: '80%' }} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 0.25 }}>
        <div style={{ color: 'red', fontSize:25, fontWeight:'bold' }}>
          404
        </div>
        {state?.error &&
          <div>
            {state.error}
          </div>
        }
      </div>
    </div>
  )
}

export default ErrorPage