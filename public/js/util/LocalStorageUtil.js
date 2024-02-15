'Use Strict';

import { AUTH_TOKEN } from '../const/SessionStorageConst';

// Keys
export const Languages = {
    ITALY: 'it',
    ENGLISH: 'en'
};

const WEB_LANG = 'web_lang';
const LOGIN_RESPONSE = 'loginResponse';

// Methods
export const setWebsiteLanguage = (language) => {
    localStorage?.setItem(WEB_LANG, language);
};

export const getWebLanguage = () => {
    return localStorage?.getItem(WEB_LANG);
};

export const setAuthTokenLocalStorage = (data) => {
    return localStorage?.setItem(AUTH_TOKEN, data);
};

export const setLoginResponseLocalStorage = (data) => {
    const stringifiedData = JSON.stringify(data);
    return localStorage?.setItem(LOGIN_RESPONSE, stringifiedData);
};

export const getLoginResponseLocalStorage = () => {
    if (localStorage?.getItem(LOGIN_RESPONSE)) {
        return JSON.parse(localStorage?.getItem(LOGIN_RESPONSE));
    }
    return null;
};

export const getAuthTokenLocalStorage = () => {
    return localStorage?.getItem(AUTH_TOKEN);
};

