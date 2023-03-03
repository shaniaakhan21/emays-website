'use strict';

import { AUTH_TOKEN, PRODUCT_LIST, LAUNCH_TYPE } from '../const/SessionStorageConst';

const getItem = (key) => {
    const itemsAsString = sessionStorage.getItem(key);
    const cleaned = itemsAsString.replace(/&#34;/g, '"');
    const json = JSON.parse(cleaned);
    return json;
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
