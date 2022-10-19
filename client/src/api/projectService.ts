import { useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProjectContext } from '../contexts/ProjectContext';
import useAuth from '../hooks/useAuth';
import { IProject, IProjectCreate, IProjectGet, IProjectInputDTO } from '../interfaces/IProject';
import { collaborateUtil } from '../utils/projectUtils';
import { getAuthenticatedAxios, getUnauthenticatedAxios } from './baseConfig';

const useProjectService = () => {
    const {
        adminUsername,
        setAdminUsername,
        activeProjectName,
        setActiveProjectname,
        activeProjectLanguage,
        setActiveProjectLanguage,
    } = useContext(ProjectContext);

    const { accessToken, username } = useAuth();
    const pathname = useLocation().pathname;
    const navigate = useNavigate();

    const authenticatedAxios = getAuthenticatedAxios('/projects', accessToken);
    const unauthenticatedAxios = getUnauthenticatedAxios('/projects');

    const handleUserJoinTasks = async (slug: string) => {
        const project = await getProjectBySlug(slug);
        setActiveProjectname(project.name);
    };

    const handleUserCollaborateTasks = async () => {
        if (!username) return;
        if (username !== collaborateUtil.getUserName(pathname)) {
            navigate('/404', {
                state: { error: "Unauthorized access. You don't have access to the request project." },
            });
            return;
        }
        const projectName = collaborateUtil.getProjectName(pathname);
        await handleProjectPresence(projectName);
    };

    const getAllProjects = async () => {
        try {
            const data: IProject[] = await authenticatedAxios.get('');
            return data;
        } catch (err) {
            throw err;
        }
    };

    const getProjectByName = async (name: string) => {
        try {
            const project: IProjectGet = await authenticatedAxios.get(`/name/${name}`);
            return project;
        } catch (err) {
            throw err;
        }
    };

    const getProjectBySlug = async (slug: string) => {
        try {
            const data: IProjectGet = await unauthenticatedAxios.get('/slug', {
                params: {
                    slug,
                },
            });
            return data;
        } catch (err) {
            throw err;
        }
    };

    const addOrGetSlug = async (name: string=activeProjectName) => {
        try {
            const data: string = await authenticatedAxios.patch('/slug', {
                name,
            });
            return data;
        } catch (err) {
            throw err;
        }
    };

    const createProject = async (projectInput: IProjectInputDTO) => {
        try {
            const data: IProjectCreate = await authenticatedAxios.post('/create', {
                ...projectInput,
            });
            return data;
        } catch (err) {
            throw err;
        }
    };

    const handleProjectPresence = async projectName => {
        try {
            const project = await getProjectByName(projectName);
            setActiveProjectLanguage(project.language);
            setActiveProjectname(project.name);
            setAdminUsername(project.username);
        } catch (err) {
            navigate('/404', { state: { error: `Project name ${projectName} does not exists` } });
        }
    };

    const isSlugPresent = async (slug: string) => {
        try {
            await getProjectBySlug(slug);
            return true;
        } catch (err) {
            return false;
        }
    };

    return {
        handleUserJoinTasks,
        handleUserCollaborateTasks,
        getAllProjects,
        getProjectByName,
        getProjectBySlug,
        addOrGetSlug,
        createProject,
        isSlugPresent,
        adminUsername,
        activeProjectName,
        activeProjectLanguage,
    };
};

export default useProjectService;
