import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { useLocation } from 'react-router-dom';
import useFileService from '../../api/fileService';
import useProjectService from '../../api/projectService';
import Navbar from '../../Components/Collaborate/Navbar';
import Main from '../../Components/FolderTree/Main';
import Monaco from '../../Components/Monaco/Monaco';
import colors from '../../constants/colors';
import useEditor from '../../hooks/useEditor';
import useSaveFile from '../../hooks/useSaveFile';
import { joinUtil } from '../../utils/projectUtils';
import styles from './playground.module.css';
import Shell from '../../Components/Shell';

const Playground = ({ slug }) => {
   const [treeLoading, setTreeLoading] = useState(true);
   const [treeState, setTreeState] = useState([]);

   const { getTree } = useFileService();
   const { activeProjectName } = useProjectService();
   const { editorData, resetEditorData } = useEditor();
   const { handleFileSave, FileSaveAlert } = useSaveFile();
   const location = useLocation();
   const [navbarHeight, setNavbarHeight] = useState(0);
   const [parentHeight, setParentHeight] = useState(0);
   const [mainHeight, setMainHeight] = useState(0);
   const [windowHeight, setWindowHeight] = useState(window.innerHeight);

   const pathname = location.pathname;

   const navbarRef = useRef(null);
   useLayoutEffect(() => {
      if (navbarRef.current && navbarRef.current.offsetHeight) setNavbarHeight(navbarRef.current.offsetHeight);
   });

   useEffect(() => {
      setMainHeight(windowHeight - navbarHeight);
   }, [navbarHeight, windowHeight]);

   useEffect(() => {
      window.addEventListener('resize', () => {
         setWindowHeight(window.innerHeight);
      });
      return () =>
         window.removeEventListener('resize', () => {
            setWindowHeight(window.innerHeight);
         });
   });

   useEffect(() => {
      resetEditorData();
   }, []);

   useEffect(() => {
      if (activeProjectName && pathname) {
         if (joinUtil.getSlug(pathname)) handleGetTree();
      }
   }, [pathname, activeProjectName]);

   useEffect(() => {
      const ctrlS = e => {
         if (e.keyCode === 83 && (navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey)) {
            e.preventDefault();
            handleFileSave();
         }
      };
      document.addEventListener('keydown', ctrlS);
      return () => document.removeEventListener('keydown', ctrlS);
   }, [editorData]);

   const handleGetTree = async () => {
      const tree = await getTree();
      setTreeState([tree]);
      setTreeLoading(false);
   };

   return (
      <div style={{ backgroundColor: colors.dark }} className={styles.wrapper}>
         <FileSaveAlert />
         <div className={styles.navbarWrapper} ref={navbarRef}>
            <Navbar projectName={activeProjectName} />
         </div>
         {treeLoading && <CircularProgress />}
         {!treeLoading && (
            <div style={{ display: 'flex', height: mainHeight }}>
               <div style={{ backgroundColor: colors.light }} className={styles.treeWrapper}>
                  <Main initialTreeState={treeState} />
               </div>
               {editorData.filePath && (
                  <>
                     <div style={{ flex: 1 }}>
                        <div style={{ backgroundColor: colors.light }} className={styles.selectedFile}>
                           <abbr title={editorData.filePath} style={{ textDecoration: 'none' }}>
                              {!editorData.saved ? '● ' : ''}
                              {editorData.fileName}
                           </abbr>
                        </div>
                        <Monaco roomId={slug} key={editorData.filePath} height={window.innerHeight - navbarHeight} />
                     </div>
                     <div style={{ height: mainHeight - 10 }} className={styles.shellWrapper}>
                        <Shell />
                     </div>
                  </>
               )}
            </div>
         )}
      </div>
   );
};

export default Playground;
