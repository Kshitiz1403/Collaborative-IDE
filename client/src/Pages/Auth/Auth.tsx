import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import './Auth.css';
import useAuthService from '../../hooks/api/authService';
import { useDispatch } from 'react-redux';
import { toggleLoginState } from '../../store/reducers/authSlice';
import useAuth from '../../hooks/useAuth';

const Auth = () => {
   const { login: loginUser, signup: signUpUser } = useAuthService();
   const { isSigninigIn } = useAuth();
   const dispatch = useDispatch();

   const [username, setUserName] = useState('');
   const [password, setPassword] = useState('');
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');

   useEffect(() => {
      if (isSigninigIn) document.title = 'Login';
      else document.title = 'Signup';
   }, [isSigninigIn]);

   const login = async () => {
      loginUser({ username, password });
   };

   const signUp = async () => {
      signUpUser({ email, name, password, username });
   };

   return (
      <div
         style={{
            display: 'flex',
            height: '100vh',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#0E1525',
            flexDirection: 'column',
         }}
      >
         <form
            onSubmit={e => {
               e.preventDefault();
               isSigninigIn ? login() : signUp();
            }}
         >
            <Box
               sx={{
                  minWidth: 300,
                  minHeight: 300,
                  // backgroundColor: 'whitesmoke',
                  // borderColor: '#9e9c89',
                  // borderWidth: 2,
                  // borderStyle: 'solid',
                  display: 'flex',
                  flexDirection: 'column',
                  p: 4,
                  borderRadius: 2,
               }}
            >
               <Typography variant="h6" style={{ textAlign: 'center', color: 'whitesmoke' }}>
                  {isSigninigIn ? 'Log In' : 'Signup'}
               </Typography>
               <TextField
                  onChange={event => setUserName(event.target.value)}
                  variant="outlined"
                  margin="normal"
                  required
                  id="username"
                  label="Username"
                  name="username"
                  value={username}
                  autoFocus
                  autoComplete="off"
                  size="small"
                  sx={{ backgroundColor: '#1c2333' }}
                  inputProps={{ sx: { color: 'whitesmoke', overflow: 'hidden' } }}
                  InputLabelProps={{
                     style: { color: '#9e9c89' },
                  }}
               />
               {!isSigninigIn && (
                  <TextField
                     onChange={event => setName(event.target.value)}
                     variant="outlined"
                     margin="normal"
                     required
                     id="name"
                     label="Name"
                     name="name"
                     size="small"
                     value={name}
                     inputProps={{ sx: { color: 'whitesmoke', backgroundColor: '#1c2333' } }}
                     InputLabelProps={{
                        style: { color: '#9e9c89' },
                     }}
                  />
               )}
               {!isSigninigIn && (
                  <TextField
                     onChange={event => setEmail(event.target.value)}
                     variant="outlined"
                     margin="normal"
                     required
                     id="email"
                     label="Email"
                     name="email"
                     size="small"
                     value={email}
                     inputProps={{ sx: { color: 'whitesmoke', backgroundColor: '#1c2333' } }}
                     InputLabelProps={{
                        style: { color: '#9e9c89' },
                     }}
                  />
               )}
               <TextField
                  onChange={event => setPassword(event.target.value)}
                  variant="outlined"
                  margin="normal"
                  required
                  id="password"
                  label="Password"
                  name="password"
                  type="password"
                  size="small"
                  inputProps={{ sx: { color: 'whitesmoke', background: '#1c2333' } }}
                  InputLabelProps={{
                     style: { color: '#9e9c89' },
                  }}
               />
               <Button type="submit" variant="contained" style={{ marginTop: 20, marginBottom: 20 }}>
                  {isSigninigIn ? 'Log In' : 'Sign up'}
               </Button>
               <Link onClick={() => dispatch(toggleLoginState())} style={{ cursor: 'pointer' }}>
                  {isSigninigIn ? "Don't have an account? Sign up" : 'Already have an account? Log in'}
               </Link>
            </Box>
         </form>
      </div>
   );
};

export default Auth;
