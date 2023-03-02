'use strict';

import { PRODUCT_LIST, EMAIL_LAUNCH_TYPE } from '../const/SessionStorageConst';

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

export const getEmailLaunchType = () => {
    return getItem(EMAIL_LAUNCH_TYPE);
};

export const setEmailLaunchType = (launchType) => {
    return sessionStorage.setItem(EMAIL_LAUNCH_TYPE, launchType);
};
