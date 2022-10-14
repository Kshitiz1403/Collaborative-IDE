import useAuth from '../hooks/useAuth';
import { IProject, IProjectCreate, IProjectInputDTO } from '../interfaces/IProject';
import { getAuthenticatedAxios } from './baseConfig';

export const useProjectService = () => {
    const { accessToken } = useAuth();

    const authenticatedAxios = getAuthenticatedAxios('/projects', accessToken);

    const getAllProjects = async () => {
        try {
            const data: IProject[] = await authenticatedAxios.get('');
            return data;
        } catch (err) {
            throw err;
        }
    };

    const createProject = async (projectInput: IProjectInputDTO) => {
        try {
            const data: IProjectCreate = await authenticatedAxios.post('create', {
                ...projectInput,
            });
            return data;
        } catch (err) {
            throw err;
        }
    };

    return { getAllProjects, createProject };
};
