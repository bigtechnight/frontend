import { atom } from 'jotai';

export const USERNAME_KEY = 'userName';

export const userNameAtom = atom(localStorage.getItem(USERNAME_KEY) || '');

export const setUserNameLocalStorage = (update: string) => {
    localStorage.setItem(USERNAME_KEY, update);
};

export const removeUserName = () => {
    localStorage.removeItem(USERNAME_KEY);
};
