import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ErrorIcon from '@mui/icons-material/Error';
import Snacker from '../../Components/Snacker/Snacker';
import { joinUtil } from '../../utils/projectUtils';
import Playground from '../Playground';
import useProjectService from '../../api/projectService';

const Join = () => {
    const location = useLocation();
    const pathname = location.pathname;
    // const slug = joinUtil.getSlug(pathname);

    const navigate = useNavigate();
    const { handleUserJoinTasks, isSlugPresent, activeProjectName } = useProjectService();

    const [isPresent, setIsPresent] = useState(true);
    const [errTimer, setErrTimer] = useState(5);
    const [slug, setSlug] = useState('');

    // run a query checking whether the room id exists in the DB or not

    // if it does, continue to the page, else fallback to a different page

    useEffect(() => {
        if (joinUtil.getSlug(pathname)) {
            const slug = joinUtil.getSlug(pathname);
            setSlug(slug);
            (async () => {
                try {
                    await isSlugPresent(slug);
                    await handleUserJoinTasks(slug);
                } catch (err) {
                    handleSlugNotPresent();
                }
            })();
        }
    }, [location]);

    useEffect(() => {
        if (activeProjectName) document.title = activeProjectName;
    }, [activeProjectName]);

    const handleSlugNotPresent = () => {
        // display error message
        setIsPresent(false);
        let timerVal = 5;
        const interval = setInterval(() => {
            timerVal--;
            setErrTimer(timerVal);
        }, 1000);
        setTimeout(() => {
            navigate('/');
            clearInterval(interval);
        }, 5000);
        // redirect to home page after timeout
    };

    return (
        <>
            {!isPresent && (
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '100vw',
                        justifyContent: 'center',
                        height: '100vh',
                        backgroundColor: '#0E1525',
                    }}
                >
                    <ErrorIcon fontSize="large" sx={{ color: 'white', zoom: 5 }} />
                    <Snacker message={`Incorrect invite URL. Taking you back to homepage in ${errTimer} sec.`} open />
                </div>
            )}
            {isPresent && <Playground slug={slug} />}
        </>
    );
};

export default Join;
