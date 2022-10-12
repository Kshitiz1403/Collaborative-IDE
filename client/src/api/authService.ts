import axios, { AxiosError } from 'axios';
import { IAPI } from '../interfaces/IAPI';
import { IAuth, IUserLoginInputDTO, IUserSignupInputDTO, IUser } from '../interfaces/IAuth';
import { getUnauthenticatedConfig, getAuthenticatedConfig } from './baseConfig';

const config = getUnauthenticatedConfig('/auth');

const axiosInstance = axios.create(config);

export const signup = async (userSignupInput: IUserSignupInputDTO): Promise<string> => {
    return axiosInstance
        .post<IAPI>('/signup', {
            ...userSignupInput,
        })
        .then(data => {
            const token = data.data.data['token'];
            localStorage.setItem('accessToken', token);

            return token;
        })
        .catch((error: AxiosError) => {
            const errorMsg = error.response.data;
            console.error(errorMsg);
            throw errorMsg;
        });
};

export const login = async (userLoginInput: IUserLoginInputDTO): Promise<IAuth> => {
    return axiosInstance
        .post<IAPI>('/signin', {
            ...userLoginInput,
        })
        .then(data => {
            localStorage.setItem('accessToken', data.data.data['token']);
            return data.data.data;
        })
        .catch((error: AxiosError) => {
            const errorMsg = error.response.data['error'];
            console.error(errorMsg);
            throw errorMsg;
        });
};

export const getUserFromToken = async (token: string): Promise<IUser> => {
    const authenticatedConfig = getAuthenticatedConfig(token, '/users');
    const axiosInstance = axios.create(authenticatedConfig);

    return axiosInstance
        .get<IAPI>('/me')
        .then(data => data.data.data['user'])
        .catch((error: AxiosError) => {
            const errorMsg = error.response.data['error'];
            console.error(errorMsg);
            throw errorMsg;
        });
};
