import axios from 'axios';

import { GameApi } from './api';
import { BASE_PATH } from './base';

const customAxios = axios.create({
    baseURL: BASE_PATH,
});

customAxios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            removeToken();
            window.location.reload();
        }
        return Promise.reject(error);
    },
);

export const GameApiRequest = new GameApi(undefined, BASE_PATH, customAxios);
export const withToken = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
});

export const hasToken = () => {
    const token = localStorage.getItem('token');
    return !!token;
};

export const setToken = (token: string) => {
    localStorage.setItem('token', token);
};

export const removeToken = () => {
    localStorage.removeItem('token');
};
