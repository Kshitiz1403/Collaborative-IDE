import { IAuth, IUser, IUserLoginInputDTO, IUserSignupInputDTO } from '../interfaces/IAuth';
import { getAuthenticatedAxios, getUnauthenticatedAxios } from './baseConfig';

const unauthenticatedAxios = getUnauthenticatedAxios('/auth');

export const signup = async (userSignupInput: IUserSignupInputDTO): Promise<IAuth['token']> => {
   return unauthenticatedAxios
      .post('/signup', {
         ...userSignupInput,
      })
      .then(data => {
         const token = data['token'];
         localStorage.setItem('accessToken', token);
         return token;
      })
      .catch(err => {
         throw err;
      });
};

export const login = async (userLoginInput: IUserLoginInputDTO): Promise<IAuth> => {
   try {
      const data: IAuth = await unauthenticatedAxios.post('/signin', { ...userLoginInput });
      const token = data['token'];
      localStorage.setItem('accessToken', token);
      return data;
   } catch (err) {
      throw err;
   }
};

export const getUserFromToken = async (token: string): Promise<IUser> => {
   const authenticatedAxios = getAuthenticatedAxios('/users', token);

   return authenticatedAxios
      .get('/me')
      .then(data => data['user'])
      .catch(err => {
         throw err;
      });
};

export const forgot = async (email: IUser['email']) => {
   try {
      const data: string = await unauthenticatedAxios.post('/forgot', { email });
      return data;
   } catch (err) {
      throw err;
   }
};

export const checkResetToken = async (token: string) => {
   try {
      const result: string = await unauthenticatedAxios.get('/reset', { params: { token } });
      return result;
   } catch (err) {
      throw err;
   }
};

export const reset = async (token: string, password: string) => {
   try {
      const result: { user: IUser } = await unauthenticatedAxios.post('/reset', { token, password });
      return result;
   } catch (err) {
      throw err;
   }
};
