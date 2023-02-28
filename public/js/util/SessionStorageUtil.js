'use strict';

import { AUTH_TOKEN, PRODUCT_LIST } from '../const/SessionStorageConst';

export const getProductList = () => {
    const itemsAsString = sessionStorage.getItem(PRODUCT_LIST);
    const cleaned = itemsAsString.replace(/&#34;/g, '"');
    const json = JSON.parse(cleaned);
    return json;
};

export const setProductList = (list) => {
    return sessionStorage.setItem(PRODUCT_LIST, list);
};

export const getAuthToken = () => {
    return sessionStorage.getItem(AUTH_TOKEN);
};

