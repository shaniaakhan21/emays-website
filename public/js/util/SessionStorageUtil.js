'use strict';

import { AUTH_TOKEN, PRODUCT_LIST, ADDRESS } from '../const/SessionStorageConst';

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
