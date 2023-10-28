import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import useProjectService from '../hooks/api/projectService';
import useAuth from '../hooks/useAuth';
import Playground from './Playground';

const Collaborate = () => {
   const { handleUserCollaborateTasks, activeProjectName, addOrGetSlug, slug } = useProjectService();
   const { username } = useAuth();

   const [loading, setLoading] = useState(true);

   useEffect(() => {
      handleUserCollaborateTasks();
   }, [username]);

   const getInviteLink = async () => {
      if (activeProjectName) addOrGetSlug();
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

   return (
      <>
         {loading && <CircularProgress />}
         {!loading && <Playground slug={slug} />}
      </>
   );
};

export default Collaborate;
