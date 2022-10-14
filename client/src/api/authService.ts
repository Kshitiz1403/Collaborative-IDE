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
