import { IUser } from '../interfaces/IAuth';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, logoutUser, setLoaded, setUser } from '../store/reducers/authSlice';
import { getAuthenticatedAxios } from '../api/baseConfig';

const useAuth = () => {
   const token = useSelector(state => state['auth']['token']);
   const isAuthenticated = useSelector(state => state['auth'].isLoggedIn);
   const isSigninigIn = useSelector(state => state['auth'].isSigninigIn);
   const userName = useSelector(state => state['auth'].user?.username) || '';
   const isLoading = useSelector(state => state['auth'].isLoading);

   const dispatch = useDispatch();

   const getUser = async (): Promise<IUser> => {
      const accessToken = localStorage.getItem('ACCESS_TOKEN') || token;
      if (accessToken === 'undefined' || accessToken === undefined || accessToken.length === 0) {
         dispatch(setLoaded());
         return;
      }
      const authenticatedAxios = getAuthenticatedAxios('/users', accessToken);
      try {
         const data = await authenticatedAxios.get('/me');
         const user: IUser = data['user'];
         dispatch(loginUser(accessToken));
         dispatch(setUser(user));
         return user;
      } catch (error) {
         dispatch(logoutUser());
      } finally {
         dispatch(setLoaded());
      }
   };

   return {
      isAuthenticated,
      username: userName,
      accessToken: token,
      isSigninigIn,
      getUser,
      isLoading,
   };
};

export default useAuth;
