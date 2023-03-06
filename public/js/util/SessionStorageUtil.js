'use strict';

import { AUTH_TOKEN, PRODUCT_LIST, ADDRESS, LAUNCH_TYPE } from '../const/SessionStorageConst';

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
