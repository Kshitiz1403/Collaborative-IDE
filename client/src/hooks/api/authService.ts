import { useDispatch, useSelector } from 'react-redux';
import { IAuth, IUser, IUserLoginInputDTO, IUserSignupInputDTO } from '../../interfaces/IAuth';
import { getUnauthenticatedAxios } from '../../api/baseConfig';
import { loginUser, logoutUser, setLoaded, setLoggingIn, setSigningUp, setUser } from '../../store/reducers/authSlice';
import validator from 'validator';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import useSnack from '../useSnack';

const useAuthService = () => {
   const dispatch = useDispatch();
   const { state } = useLocation();
   const navigate = useNavigate();
   const snackService = useSnack();
   //    const token = useSelector(state => state['auth']['token']);
   const unauthenticatedAxios = useCallback(getUnauthenticatedAxios('/auth'), []);

   const signup = async (userSignupInput: IUserSignupInputDTO): Promise<IAuth> => {
      if (!validator.isEmail(userSignupInput.email)) {
         snackService.setError({ message: 'Please enter valid email' });
         return;
      }
      try {
         const data: IAuth = await unauthenticatedAxios.post('/signup', {
            ...userSignupInput,
         });
         const token = data.token;
         const user = data.user;
         localStorage.setItem('ACCESS_TOKEN', token);

         dispatch(loginUser(token));
         dispatch(setUser(user));
         dispatch(setSigningUp());
         navigate(state?.path || '/', { replace: true });

         return data;
      } catch (error) {
         snackService.setError({ message: error });
      }
   };

   const login = async (userLoginInput: IUserLoginInputDTO): Promise<IAuth> => {
      try {
         const data: IAuth = await unauthenticatedAxios.post('/signin', { ...userLoginInput });
         const token = data.token;
         const user = data.user;
         localStorage.setItem('ACCESS_TOKEN', token);

         dispatch(loginUser(token));
         dispatch(setUser(user));
         dispatch(setLoggingIn());
         navigate(state?.path || '/', { replace: true });

         return data;
      } catch (error) {
         snackService.setError({ message: error });
      }
   };

   const logout = () => {
      localStorage.removeItem('ACCESS_TOKEN');
      dispatch(logoutUser());
   };

   const forgot = async (email: IUser['email']) => {
      if (!validator.isEmail(email)) {
         return snackService.setError({ message: 'Please enter valid email' });
      }
      try {
         const data = await unauthenticatedAxios.post('/forgot', { email });
         snackService.setSuccess({ message: data });
      } catch (error) {
         snackService.setError({ message: error });
      }
   };

   const resetPassword = async (resetToken: string, password: string) => {
      try {
         const result: { user: IUser } = await unauthenticatedAxios.post('/reset', { token: resetToken, password });
         snackService.setSuccess({ message: 'Password has been reset, please login in again with your new password' });
         navigate('/auth');
         return result;
      } catch (err) {
         snackService.setError({ message: err });
      }
   };

   const checkResetToken = async (token: string) => {
      try {
         const result: string = await unauthenticatedAxios.get('/reset', { params: { token } });
         return result;
      } catch (err) {
         throw err;
      }
   };

   return { signup, login, logout, forgot, resetPassword, checkResetToken };
};

export default useAuthService;
