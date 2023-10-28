import { useCallback } from 'react';
import { getProjectAxios } from '../../api/baseConfig';
import useAuth from '../useAuth';
import useProjectService from './projectService';
import useSnack from '../useSnack';

const useCompileService = () => {
   const { activeProjectName, slug } = useProjectService();
   const { accessToken } = useAuth();
   const snackService = useSnack();

   const compileAxios = useCallback(getProjectAxios(accessToken, activeProjectName, '/compile'), [
      accessToken,
      activeProjectName,
   ]);

   const compileProject = async () => {
      try {
         const result: string = await compileAxios.post('', {}, { params: { slug } });
         snackService.setSuccess({ message: 'Compiled successfully' });

         return result;
      } catch (err) {
         snackService.setError({ message: err });
      }
   };

   return { compileProject };
};

export default useCompileService;
