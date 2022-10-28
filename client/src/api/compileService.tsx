import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Snacker from '../Components/Snacker/Snacker';
import useAuth from '../hooks/useAuth';
import { ISnacker } from '../interfaces/ISnacker';
import { joinUtil } from '../utils/projectUtils';
import { getProjectAxios } from './baseConfig';
import useProjectService from './projectService';

const useCompileService = () => {
   const { activeProjectName } = useProjectService();
   const { accessToken } = useAuth();
   const compileAxios = getProjectAxios(accessToken, activeProjectName, '/compile');

   const pathname = useLocation().pathname;
   const [slug, setSlug] = useState('');
   const closeSnacker = () => {
      setSnackerData(prevData => {
         return { ...prevData, open: false };
      });
   };
   const [snackerData, setSnackerData] = useState<ISnacker>({
      open: false,
      severity: 'success',
      message: '',
      onClose: closeSnacker,
   });

   useEffect(() => {
      if (joinUtil.isJoinPath(pathname)) {
         setSlug(joinUtil.getSlug(pathname));
      }
   }, [pathname]);

   const compileProject = async () => {
      try {
         const result: string = await compileAxios.post('', {}, { params: { slug } });
         setSnackerData(prev => {
            return {
               ...prev,
               open: true,
               message: 'Compiled successfully',
               severity: 'success',
            };
         });
         return result;
      } catch (err) {
         setSnackerData(prev => {
            return { ...prev, open: true, message: err, severity: 'error' };
         });
      }
   };

   const CompileAlert = () => (
      <Snacker
         message={snackerData.message}
         open={snackerData.open}
         severity={snackerData.severity}
         onClose={snackerData.onClose}
      />
   );

   return { compileProject, CompileAlert };
};

export default useCompileService;
