import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import CodeIcon from '@mui/icons-material/Code';
import { useNavigate } from 'react-router-dom';
import colors from '../constants/colors';

const HomePage = () => {
   let navigate = useNavigate();

   useEffect(() => {
      document.title = 'Collaborative IDE';
   }, []);

   const handleOnAuth = () => {
      navigate('/auth');
   };

   const handleOnForgot = () =>{
    navigate('/forgot');
   }

   return (
      <div
         style={{
            display: 'flex',
            flexGrow: 1,
            height: '100vh',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.dark,
         }}
      >
         <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Button
               variant="contained"
               onClick={handleOnAuth}
               style={{ paddingTop: 10, paddingBottom: 10, marginBottom: 10 }}
            >
               Login/Signup
            </Button>
            <Button variant="outlined" style={{ paddingTop: 10, paddingBottom: 10 }} onClick={handleOnForgot}>
               Forgot Password
            </Button>
         </div>
      </div>
   );
};

export default HomePage;
