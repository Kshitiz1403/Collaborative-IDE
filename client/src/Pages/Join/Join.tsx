import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import ErrorIcon from '@mui/icons-material/Error';
import Snacker from '../../Components/Snacker/Snacker';
import Monaco from '../../Components/Monaco/Monaco';
import Main from '../../Components/FolderTree/Main';
import colors from '../../constants/colors';
import Navbar from '../../Components/Collaborate/Navbar';
import useProjectService from '../../api/projectService';
import { joinUtil } from '../../utils/projectUtils';
import useFileService from '../../api/fileService';

const Join = () => {
    const location = useLocation();
    const pathname = location.pathname;
    const slug = joinUtil.getSlug(pathname);

    const navigate = useNavigate();
    const { handleUserJoinTasks, isSlugPresent, activeProjectName } = useProjectService();
    const { getTree } = useFileService();

    const [isLoading, setIsLoading] = useState(true);
    const [isPresent, setIsPresent] = useState(true);
    const [errTimer, setErrTimer] = useState(5);
    const [treeState, setTreeState] = useState([]);

    // run a query checking whether the room id exists in the DB or not
    // if it does, continue to the page, else fallback to a different page

    useEffect(() => {
        (async () => {
            try {
                await isSlugPresent(slug);
                await handleUserJoinTasks(slug);
            } catch (err) {
                handleSlugNotPresent();
            }
        })();
    }, [slug]);

    useEffect(() => {
        if (activeProjectName && pathname) {
            handleGetTree();
        }
    }, [activeProjectName, location]);

    useEffect(() => {
        if (activeProjectName) document.title = activeProjectName;
    }, [activeProjectName]);

    const handleGetTree = async () => {
        const tree = await getTree();
        setTreeState([tree]);
        setIsLoading(false);
    };

    const handleSlugNotPresent = () => {
        // display error message
        setIsPresent(false);
        setIsLoading(false);
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
        <div style={{ backgroundColor: colors.dark, height: '100vh', overflow: 'hidden' }}>
            <div
                style={{
                    marginBottom: 10,
                    borderColor: 'white',
                    borderStyle: 'solid',
                    borderWidth: 0,
                    borderBottomWidth: 1,
                }}
            >
                <Navbar showInvite={false} projectname={activeProjectName} />
            </div>
            {isLoading && (
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        position: 'fixed',
                        justifyContent: 'center',
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'grey',
                        zIndex: 9999999999,
                        opacity: 0.6,
                    }}
                >
                    <CircularProgress color="inherit" />
                </div>
            )}
            {!isLoading && !isPresent && (
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
            {!isLoading && isPresent && (
                <div style={{ display: 'flex' }}>
                    <div
                        style={{
                            backgroundColor: colors.light,
                            borderRadius: 10,
                            color: 'white',
                            marginRight: 10,
                            marginLeft: 10,
                        }}
                    >
                        <Main initialTreeState={treeState} />
                    </div>
                    <Monaco roomId={slug} />
                </div>
            )}
        </div>
    );
};

export default Join;
