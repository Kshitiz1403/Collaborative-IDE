import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ErrorIcon from '@mui/icons-material/Error';
import { joinUtil } from '../../utils/projectUtils';
import Playground from '../Playground';
import useProjectService from '../../hooks/api/projectService';
import Loading from '../../Components/Loading';

const Join = () => {
   const location = useLocation();
   const pathname = location.pathname;

   const { handleUserJoinTasks, activeProjectName, isSlugValid, isLoading, slug } = useProjectService();

   // run a query checking whether the room id exists in the DB or not

   // if it does, continue to the page, else fallback to a different page

   useEffect(() => {
      if (joinUtil.getSlug(pathname)) {
         const slug = joinUtil.getSlug(pathname);
         handleUserJoinTasks(slug);
      }
   }, [location]);

   useEffect(() => {
      if (activeProjectName) document.title = activeProjectName;
   }, [activeProjectName]);

   return (
      <>
         {isLoading && <Loading />}
         {!isLoading && !isSlugValid && (
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
            </div>
         )}
         {!isLoading && isSlugValid && <Playground slug={slug} />}
      </>
   );
};

export default Join;
