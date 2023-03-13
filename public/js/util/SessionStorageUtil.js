'use strict';

import { AUTH_TOKEN, PRODUCT_LIST, ADDRESS, LAUNCH_TYPE, USER_DATA } from '../const/SessionStorageConst';

const getItem = (key) => {
    const itemsAsString = sessionStorage.getItem(key);
    const cleaned = itemsAsString.replace(/&#34;/g, '"');
    const json = JSON.parse(cleaned);
    return json;
};

export const loadLocalStorage = (path, setStateFn) => {
    const data = sessionStorage.getItem(path);
    if (data) {
        setStateFn?.(JSON.parse(data));
        return JSON.parse(data);
    }
    return null;
};

export const handleStorage = async (path, u, noRemove) => {
    if (u) {
        sessionStorage.setItem(path, JSON.stringify(u));
    } else if (!noRemove) {
        sessionStorage.removeItem(path);
    }
};

export const createCustomSetStateFn = (path, origFn, noRemove) => {
    return (u) => {
        if (u instanceof Function) {
            origFn((cu) => {
                const r = u(cu);
                handleStorage(path, r, noRemove);
                return r;
            });
        } else {
            origFn(u);
            handleStorage(path, u, noRemove);
        }
    };
};

export const getProductList = () => {
    return getItem(PRODUCT_LIST);
};

export const setProductList = (list) => {
    return sessionStorage.setItem(PRODUCT_LIST, list);
};

export const getLaunchType = () => {
    return sessionStorage.getItem(LAUNCH_TYPE);
};

export const setLaunchType = (launchType) => {
    return sessionStorage.setItem(LAUNCH_TYPE, launchType);
};

export const getAuthToken = () => {
    return sessionStorage.getItem(AUTH_TOKEN);
};

export const getAddress = () => {
    const addressAsString = sessionStorage.getItem(ADDRESS);
    const cleaned = addressAsString.replace(/&#34;/g, '"');
    const json = JSON.parse(cleaned);
    return json;
};

export const setAddress = (address) => {
    sessionStorage.setItem(ADDRESS, JSON.stringify(address));
};

export const saveSelectedOptions = (selectedOptions) => {
    sessionStorage.setItem('selectedOptions', JSON.stringify(selectedOptions));
};

export const getSelectedOptions = () => {
    return JSON.parse(sessionStorage.getItem('selectedOptions')) || {};
};

export const getUserData = () => {
    const userDataString = sessionStorage.getItem(USER_DATA);
    const cleaned = userDataString.replace(/&#34;/g, '"');
    const json = JSON.parse(cleaned);
    return json;
};
