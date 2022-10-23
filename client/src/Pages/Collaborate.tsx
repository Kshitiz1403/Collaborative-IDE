import React, { useEffect, useState } from 'react';
import useProjectService from '../api/projectService';
import useAuth from '../hooks/useAuth';
import Playground from './Playground';

const Collaborate = () => {
    const { activeProjectName, handleUserCollaborateTasks, addOrGetSlug } = useProjectService();
    const { username } = useAuth();

    const [loading, setLoading] = useState(true);
    const [inviteLink, setInviteLink] = useState('');

    useEffect(() => {
        (async () => {
            await handleUserCollaborateTasks();
        })();
    }, [username]);

    const getInviteLink = async () => {
        if (activeProjectName) {
            const slug = await addOrGetSlug();
            setInviteLink(slug);
        }
    };

    useEffect(() => {
        const onPageLoad = () => {
            setLoading(false);
        };
        if (document.readyState == 'complete') {
            onPageLoad();
        } else {
            window.addEventListener('load', onPageLoad);
            return () => window.removeEventListener('load', onPageLoad);
        }
    }, []);

    useEffect(() => {
        if (!loading) {
            getInviteLink();
        }
    }, [loading, activeProjectName]);

    useEffect(() => {
        if (!loading) {
            document.title = activeProjectName;
        }
    }, [loading, activeProjectName]);

    return <>
        {!loading && <Playground slug={inviteLink} />}
    </>;
};

export default Collaborate;
