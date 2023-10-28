import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { useLocation } from 'react-router-dom';
import useFileService from '../../hooks/api/fileService';
import useProjectService from '../../hooks/api/projectService';
import Navbar from '../../Components/Collaborate/Navbar';
import Main from '../../Components/FolderTree/Main';
import Monaco from '../../Components/Monaco/Monaco';
import colors from '../../constants/colors';
import useEditor from '../../hooks/useEditor';
import { joinUtil } from '../../utils/projectUtils';
import styles from './playground.module.css';
import Shell from '../../Components/Shell';
import useFile from '../../hooks/useFile';
import useInitializePlayground from '../../hooks/runOnce';

const Playground = ({ slug }) => {
   useInitializePlayground();

   const [treeLoading, setTreeLoading] = useState(true);
   const [treeState, setTreeState] = useState([]);

   const { getTree } = useFileService();
   const { handleFileSave } = useFile();
   const { activeProjectName } = useProjectService();
   const { resetEditor, filePath, fileName, saved } = useEditor();
   const location = useLocation();
   const [navbarHeight, setNavbarHeight] = useState(0);
   // const [parentHeight, setParentHeight] = useState(0);
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
      resetEditor();
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
   });

   const handleGetTree = async () => {
      const tree = await getTree();
      setTreeState([tree]);
      setTreeLoading(false);
   };

   return (
      <div style={{ backgroundColor: colors.dark }} className={styles.wrapper}>
         <div className={styles.navbarWrapper} ref={navbarRef}>
            <Navbar />
         </div>
         {treeLoading && <CircularProgress />}
         {!treeLoading && (
            <div style={{ display: 'flex', height: mainHeight }}>
               <div style={{ backgroundColor: colors.light }} className={styles.treeWrapper}>
                  <Main initialTreeState={treeState} />
               </div>
               {filePath && (
                  <>
                     <div style={{ flex: 1 }}>
                        <div style={{ backgroundColor: colors.light }} className={styles.selectedFile}>
                           <abbr title={filePath} style={{ textDecoration: 'none' }}>
                              {!saved ? '● ' : ''}
                              {fileName}
                           </abbr>
                        </div>
                        {/* Adding a key as file path ensures monaco is realoaded every time the filepath changes */}
                        <Monaco roomId={slug} key={filePath} height={window.innerHeight - navbarHeight} />
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
