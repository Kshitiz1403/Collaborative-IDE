import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Box from '@mui/system/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Snacker from '../../Components/Snacker/Snacker';
import CreateLanguageBox from '../../Components/ProjectBox/CreateProjectBox';
import useAuth from '../../hooks/useAuth';
import colors from '../../constants/colors';
import RecentBox from '../../Components/ProjectBox/RecentBox';
import useProjectService from '../../api/projectService';
import { TbLogout } from 'react-icons/tb';

const Dashboard = () => {
   const navigate = useNavigate();

   const { username, setIsAuthenticated } = useAuth();
   const [isOpen, setIsOpen] = useState(false);
   const [selectedLanguage, setSelectedLanguage] = useState('');
   const [projectName, setProjectName] = useState('');
   const [isSuccess, setIsSuccess] = useState(false);
   const [isError, setIsError] = useState(false);
   const [successMsg, setSuccessMsg] = useState('');
   const [errorMsg, setErrorMsg] = useState('');
   const [myProjects, setMyProjects] = useState([]);

   const projectService = useProjectService();

   const handleClose = () => {
      setIsOpen(false);
      setProjectName('');
   };
   const handleOpen = language => {
      setSelectedLanguage(language);
      setIsOpen(true);
   };

   const handleCreateProject = async () => {
      try {
         const createdProject = await projectService.createProject({
            name: projectName,
            language: selectedLanguage,
         });
         setSuccessMsg('Project created successfully');
         setIsSuccess(true);
         setTimeout(() => {
            navigate(`/@${username}/${projectName}`);
         }, 1000);
      } catch (err) {
         setErrorMsg(err);
         setIsError(true);
      }
   };

   const getAllProjects = async () => {
      try {
         const projects = await projectService.getAllProjects();
         setMyProjects(projects);
      } catch (err) {
         setIsError(true);
         setErrorMsg(err);
      }
   };

   const logout = () => {
      localStorage.removeItem('ACCESS_TOKEN');
      setIsAuthenticated(false);
   };

   useEffect(() => {
      getAllProjects();
      document.title = 'Dashboard';
   }, []);

   return (
      <>
         <Modal open={isOpen} onClose={handleClose}>
            <Box
               sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 'fit-content',
                  bgcolor: colors.light,
                  color: 'whitesmoke',
                  borderRadius: 2,
                  boxShadow: 24,
                  p: 2,
                  // height: 200,
                  display: 'flex',
               }}
            >
               <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <h2 style={{ margin: 0, marginBottom: 25 }}>Create a {selectedLanguage} project</h2>
                  <form
                     onSubmit={e => {
                        e.preventDefault();
                        handleCreateProject();
                     }}
                  >
                     <div style={{ marginBottom: 25 }}>
                        <h3 style={{ marginBottom: 5, fontWeight: 'normal' }}>Title</h3>
                        <TextField
                           autoFocus
                           variant="outlined"
                           fullWidth
                           size="small"
                           placeholder="Name your project"
                           value={projectName}
                           sx={{ input: { color: 'whitesmoke' } }}
                           onChange={e => setProjectName(e.target.value)}
                        />
                     </div>
                     <Button type="submit" variant="contained" size="small" style={{ width: '100%' }}>
                        Create Project
                     </Button>
                  </form>
               </div>
            </Box>
         </Modal>

         <div style={{ display: 'flex', height: '100vh', backgroundColor: colors.dark, color: 'whitesmoke' }}>
            <Container maxWidth="md" style={{ marginTop: 50 }}>
               <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                     <div>Create Project</div>
                     <abbr title="Logout">
                        <TbLogout size={20} onClick={logout} style={{ cursor: 'pointer' }} />
                     </abbr>
                  </div>
                  <Snacker
                     open={isSuccess}
                     autoHideDuration={3000}
                     onClose={() => setIsSuccess(false)}
                     severity="success"
                     message={successMsg}
                  />
                  <Snacker
                     open={isError}
                     message={errorMsg}
                     autoHideDuration={3000}
                     onClose={() => setIsError(false)}
                  />
                  <CreateLanguageBox
                     languages={[
                        { language: 'c++', onClick: () => handleOpen('c++') },
                        { language: 'python', onClick: () => handleOpen('python') },
                        { language: 'java', onClick: () => handleOpen('java') },
                        { language: 'nodejs', onClick: () => handleOpen('nodejs') },
                     ]}
                  />
                  <div>
                     My Projects
                     <RecentBox data={myProjects} />
                  </div>
               </div>
            </Container>
         </div>
      </>
   );
};

export default Dashboard;
