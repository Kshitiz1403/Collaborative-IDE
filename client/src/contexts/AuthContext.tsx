import { createContext, useEffect, useState } from 'react';
import { getUserFromToken } from '../api/authService';

export const AuthContext = createContext(null);

const AuthProvider = (props: any) => {
   const [isAuthenticated, setIsAuthenticated] = useState(false);
   const [username, setUsername] = useState('');
   const [accessToken, setAccessToken] = useState('');
   const [loggingIn, setLoggingIn] = useState(true)

   useEffect(() => {
      console.log('Auth Context reloaded');
      const token = localStorage.getItem('ACCESS_TOKEN') || accessToken;
      if (token == 'undefined' || token === undefined) return;
      if (token.length === 0) return;
      (async () => {
         try {
            const user = await getUserFromToken(token);
            setUsername(user.username);
            setAccessToken(token);
            setIsAuthenticated(true);
         } catch (err) {
            setIsAuthenticated(false);
         }
         finally{
            setLoggingIn(false)
         }
      })();
   }, []);

   return (
      <AuthContext.Provider
         value={{ isAuthenticated, setIsAuthenticated, username, setUsername, accessToken, setAccessToken, loggingIn }}
      >
         {props.children}
      </AuthContext.Provider>
   );
};
export default AuthProvider;
