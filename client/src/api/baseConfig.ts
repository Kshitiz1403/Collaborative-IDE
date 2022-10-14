import axios, { AxiosRequestHeaders } from 'axios';

interface config {
    baseURL?: string;
    headers?: AxiosRequestHeaders;
}

const config = {
    baseURL: 'http://localhost:4000/api',
    headers: {
        'Content-Type': 'application/json',
    }
};

const getUnauthenticatedConfig = (url: string = ''): config => {
    const getBaseURL = () => {
        const baseURL = config.baseURL;
        const updatedBaseURL = `${baseURL}${url}`;
        return updatedBaseURL;
    };
    const configuration = { ...config };
    configuration.baseURL = getBaseURL();
    return configuration;
};

const getAuthenticatedConfig = (token: string, url: string = ''): config => {
    const configuration = getUnauthenticatedConfig(url);
    configuration['headers']['Authorization'] = token;
    return configuration;
};

export const getAuthenticatedAxios = (url: string = '', token: string) => {
    const config = getAuthenticatedConfig(token, url);
    const authenticatedAxios = axios.create(config);
    authenticatedAxios.interceptors.response.use(
        response => {
            let res = response.data;
            return res.data;
        },
        error => {
            let err = error.response.data;
            console.error(err);
            throw err.error;
        },
    );

    return authenticatedAxios;
};

export const getUnauthenticatedAxios = (url: string = '') => {
    const config = getUnauthenticatedConfig(url);
    const unauthenticatedAxios = axios.create(config);
    unauthenticatedAxios.interceptors.response.use(
        response => {
            let res = response.data;
            return res.data;
        },
        error => {
            let err = error.response.data;
            console.error(err);
            throw err.error;
        },
    );

    return unauthenticatedAxios;
};
