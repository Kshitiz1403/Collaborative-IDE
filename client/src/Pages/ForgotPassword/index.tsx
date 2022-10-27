import React, { useState } from 'react';
import colors from '../../constants/colors';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import validator from 'validator';
import Snacker from '../../Components/Snacker/Snacker';
import Box from '@mui/material/Box';
import { ISnacker } from '../../interfaces/ISnacker';
import { forgot } from '../../api/authService';

const Forgot = () => {
   const onCloseSnacker = () => {
      setSnackerData(prev => {
         return { ...prev, open: false };
      });
   };

   const [email, setEmail] = useState('');
   const [snackerData, setSnackerData] = useState<ISnacker>({
      open: false,
      onClose: onCloseSnacker,
      message: '',
      severity: 'error',
   });

   const sendResetEmail = async () => {
      if (!validator.isEmail(email)) {
         setSnackerData(prev => {
            return {
               ...prev,
               open: true,
               message: 'Please enter valid email',
               severity: 'error',
            };
         });
         return;
      }
      try {
         const result = await forgot(email);
         setSnackerData(prev => {
            return { ...prev, open: true, message: result, severity: 'success' };
         });
      } catch (err) {
         setSnackerData(prev => {
            return { ...prev, open: true, message: err, severity: 'error' };
         });
      }
   };

   return (
      <div
         style={{
            display: 'flex',
            flexGrow: 1,
            height: '100vh',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.dark,
            color: 'whitesmoke',
         }}
      >
         <Snacker
            message={snackerData.message}
            onClose={snackerData.onClose}
            open={snackerData.open}
            severity={snackerData.severity}
         />
         <form
            id="send-reset"
            onSubmit={e => {
               e.preventDefault();
               sendResetEmail();
            }}
         >
            <Box
               sx={{
                  width: 300,
                  display: 'flex',
                  flexDirection: 'column',
                  p: 4,
                  borderRadius: 2,
               }}
            >
               <div style={{ textAlign: 'center', marginBottom: 10 }}>
                  Enter your email and we'll send you a link to reset your password
               </div>
               <TextField
                  onChange={event => setEmail(event.target.value)}
                  variant="outlined"
                  margin="normal"
                  required
                  id="Email"
                  label="Email"
                  name="Email"
                  type="email"
                  value={email}
                  autoFocus
                  autoComplete="off"
                  size="small"
                  sx={{ backgroundColor: '#1c2333' }}
                  inputProps={{ sx: { color: 'whitesmoke', overflow: 'hidden' } }}
                  InputLabelProps={{
                     style: { color: '#9e9c89' },
                  }}
               />
               <Button variant="contained" type="submit" style={{ marginTop: 10, marginBottom: 10 }} form="send-reset">
                  Reset Password
               </Button>
            </Box>
         </form>
      </div>
   );
};

export default Forgot;
