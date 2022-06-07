import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useIsRoomIDPresent from '../../utils/isRoomIDPresent';
import CircularProgress from '@mui/material/CircularProgress';
import ErrorIcon from '@mui/icons-material/Error';
import Snacker from '../../Components/Snacker/Snacker';
import Monaco from '../../Monaco'


const Join = () => {

    const location = useLocation();
    const pathname = location.pathname;
    const roomID = pathname.split('/').slice(-1)[0];
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(true)
    const [isPresent, setIsPresent] = useState(true)
    const [errTimer, setErrTimer] = useState(5)

    // run a query checking whether the room id exists in the DB or not
    // if it does, continue to the page, else fallback to a different page

    const isRoomIDPresent = useIsRoomIDPresent(roomID)

    useEffect(() => {
        isRoomIDPresent
            .then()
            .catch(err => handleRoomIDNotPresent())
            .finally(setIsLoading(false))
    }, [])


    const handleRoomIDNotPresent = () => {
        // display error message
        setIsPresent(false)
        let timerVal = 5;
        const interval = setInterval(() => {
            timerVal--;
            setErrTimer(timerVal);
        }, 1000);
        setTimeout(() => {
            navigate('/')
            clearInterval(interval)
        }, 5000);
        // redirect to home page after timeout
    }

    return (
        <div>
            {isLoading && <div style={{ display: 'flex', alignItems: 'center', position: 'fixed', justifyContent: 'center', width: '100%', height: '100%', backgroundColor: 'grey', zIndex: 9999999999, opacity: 0.6, }}>
                <CircularProgress color='inherit' />
            </div>}
            {!isLoading && !isPresent &&
                <div style={{ display: 'flex', alignItems: 'center', width: '100vw', justifyContent: 'center', height: '100vh', backgroundColor: '#0E1525' }}>
                    <ErrorIcon fontSize='large' sx={{ color: 'white', zoom: 5 }} />
                    <Snacker message={`Incorrect invite URL. Taking you back to homepage in ${errTimer} sec.`} open />
                </div>
            }
            {
                !isLoading && isPresent &&
                <Monaco roomId={roomID} height="100vh" loadingComponent={<CircularProgress color='success' />} />
            }
        </div>
    )
}

export default Join