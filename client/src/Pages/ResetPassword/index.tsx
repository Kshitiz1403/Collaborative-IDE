import React, { useEffect, useState } from 'react';
import colors from '../../constants/colors';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snacker from '../../Components/Snacker/Snacker';
import Box from '@mui/material/Box';
import { ISnacker } from '../../interfaces/ISnacker';
import { useNavigate, useParams } from 'react-router-dom';
import { checkResetToken, reset } from '../../api/authService';
import Loading from '../../Components/Loading';

const Reset = () => {
   const onCloseSnacker = () => {
      setSnackerData(prev => {
         return { ...prev, open: false };
      });
   };

   const [password, setPassword] = useState('');
   const [loading, setLoading] = useState(true);
   const [token, setToken] = useState('');

   const [snackerData, setSnackerData] = useState<ISnacker>({
      open: false,
      onClose: onCloseSnacker,
      message: '',
      severity: 'error',
   });

   const params = useParams();
   const navigate = useNavigate();

   useEffect(() => {
      const resetToken = params['*'];
      setToken(resetToken);
      (async () => {
         try {
            await checkResetToken(resetToken);
            setLoading(false);
         } catch (err) {
            navigate('/404', { state: { error: err } });
         }
      })();
   }, [params]);

   const resetPassword = async () => {
      try {
         await reset(token, password);
         setSnackerData(prev => {
            return {
               ...prev,
               open: true,
               message: 'Password has been reset, please login in again with your new password',
               severity: 'success',
               onClose: () => navigate('/auth'),
            };
         });
      } catch (err) {
         setSnackerData(prev => {
            return {
               ...prev,
               open: true,
               message: err,
               severity: 'error',
               onClose: onCloseSnacker,
            };
         });
      }
   };

   if (loading)
      return (
         <Loading/>
      );
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
               resetPassword();
            }}
         >
            <Box
               sx={{
                  width: 250,
                  display: 'flex',
                  flexDirection: 'column',
                  p: 4,
                  borderRadius: 2,
               }}
            >
               <div style={{ textAlign: 'center', marginBottom: 10 }}>Enter a new password</div>
               <TextField
                  onChange={event => setPassword(event.target.value)}
                  variant="outlined"
                  margin="normal"
                  required
                  id="Password"
                  label="Password"
                  name="Password"
                  type="password"
                  value={password}
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

export default Reset;
