import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useAuth from '../useAuth';
import { getAuthenticatedAxios, getUnauthenticatedAxios } from '../../api/baseConfig';
import { IProject, IProjectCreate, IProjectGet, IProjectInputDTO } from '../../interfaces/IProject';
import useSnack from '../useSnack';
import {
   setActiveLanguage,
   setActiveName,
   setAdminUsername,
   setDefaultFile,
   setLoaded,
   setLoading,
   setProject,
   setProjects,
   setSlug,
   setSlugInvalid,
   setSlugValid,
} from '../../store/reducers/projectSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { collaborateUtil } from '../../utils/projectUtils';
import { setFileName, setFilePath, setLanguage } from '../../store/reducers/editorSlice';

const useProjectService = () => {
   const dispatch = useDispatch();
   const snackService = useSnack();
   const navigate = useNavigate();
   const { accessToken, username } = useAuth();
   const pathname = useLocation().pathname;

   const authenticatedAxios = useCallback(getAuthenticatedAxios('/projects', accessToken), [accessToken]);
   const unauthenticatedAxios = useCallback(getUnauthenticatedAxios('/projects'), []);

   const activeProjectName = useSelector(state => state['project'].name);
   const isSlugValid = useSelector(state => state['project'].isSlugValid);
   const isLoading = useSelector(state => state['project'].loading);
   const slug = useSelector(state => state['project'].slug);
   const defaultFile = useSelector(state => state['project'].defaultFile);

   const getAllProjects = async () => {
      try {
         dispatch(setLoading());
         const data: IProject[] = await authenticatedAxios.get('');
         dispatch(setProjects(data));
         return data;
      } catch (error) {
         snackService.setError({ message: error });
      } finally {
         dispatch(setLoaded());
      }
   };

   const initializeProject = (data: IProjectGet) => {
      console.log(data);
      dispatch(setProject(data));

      dispatch(setSlugValid());
      dispatch(setActiveLanguage(data['language']));
      dispatch(setAdminUsername(data['username']));
      dispatch(setActiveName(data['name']));
      dispatch(setSlug(data['slug']));
      dispatch(setDefaultFile(data['defaultFile']));
   };

   const getProject = async (name: IProject['name']) => {
      try {
         dispatch(setLoading());

         const data: IProjectGet = await authenticatedAxios.get(`/name/${name}`);
         initializeProject(data);

         return data;
      } catch (error) {
         navigate('/404', { state: { error: `Project name ${name} does not exist` } });
      } finally {
         dispatch(setLoaded());
      }
   };

   const getProjectBySlug = async (slug: string) => {
      try {
         dispatch(setLoading());
         const data: IProjectGet = await unauthenticatedAxios.get('/slug', {
            params: {
               slug,
            },
         });
         initializeProject(data);
         return data;
      } catch (err) {
         dispatch(setSlugInvalid());
         throw err;
      } finally {
         dispatch(setLoaded());
      }
   };

   const createProject = async (projectInput: IProjectInputDTO) => {
      try {
         dispatch(setLoading());

         const data: IProjectCreate = await authenticatedAxios.post('/create', {
            ...projectInput,
         });
         snackService.setSuccess({ message: 'Project created successfully' });
         navigate(`/@${username}/${projectInput.name}`);
         return data;
      } catch (err) {
         snackService.setError({ message: err });
      } finally {
         dispatch(setLoaded());
      }
   };

   const handleUserJoinTasks = async (slug: string) => {
      try {
         dispatch(setLoading());
         const project = await getProjectBySlug(slug);
      } catch (error) {
         let timerValue = 5;

         const interval = setInterval(() => {
            timerValue--;
            snackService.setError({
               message: `Incorrect invite URL. Taking you back to homepage in ${timerValue} sec.`,
            });
         }, 1000);

         setTimeout(() => {
            navigate('/');
            clearInterval(interval);
            snackService.reset();
         }, 5000);
      } finally {
         dispatch(setLoaded());
      }
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
      getProject(projectName);
   };

   const addOrGetSlug = async (name: string = activeProjectName) => {
      try {
         dispatch(setLoading());
         const data: string = await authenticatedAxios.patch('/slug', {
            name,
         });
         dispatch(setSlug(data));
         return data;
      } catch (err) {
         snackService.setError({ message: err });
      } finally {
         dispatch(setLoaded());
      }
   };

   return {
      getAllProjects,
      getProject,
      createProject,
      handleUserJoinTasks,
      activeProjectName,
      isSlugValid,
      isLoading,
      handleUserCollaborateTasks,
      addOrGetSlug,
      slug,
      defaultFile,
   };
};
export default useProjectService;
