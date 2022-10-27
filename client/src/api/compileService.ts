import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { joinUtil } from '../utils/projectUtils';
import { getProjectAxios } from './baseConfig';
import useProjectService from './projectService';

const useCompileService = () => {
   const { activeProjectName } = useProjectService();
   const { accessToken } = useAuth();
   const compileAxios = getProjectAxios(accessToken, activeProjectName, '/compile');

   const pathname = useLocation().pathname;
   const [slug, setSlug] = useState('');

   useEffect(() => {
      if (joinUtil.isJoinPath(pathname)) {
         setSlug(joinUtil.getSlug(pathname));
      }
   }, [pathname]);

   const compileProject = async () => {
      try {
         const result: string = await compileAxios.post('', { params: { slug } });
         return result;
      } catch (err) {
         throw err;
      }
   };

   return { compileProject };
};

export default useCompileService;
