import { useState } from 'react';
import colors from '../../constants/colors';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import useAuthService from '../../hooks/api/authService';

const Forgot = () => {
   const authService = useAuthService();

   const [email, setEmail] = useState('');

   const sendResetEmail = async () => {
      authService.forgot(email);
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
