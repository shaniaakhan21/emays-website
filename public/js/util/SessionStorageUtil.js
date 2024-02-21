'use strict';

import { AUTH_TOKEN, PRODUCT_LIST, ADDRESS, LAUNCH_TYPE, USER_DATA,
    RETAILER_DATA, SERVICE_COST, STORE_IMAGE, SELECTED_LAUNCH_AREA,
    LICENSE_DOCUMENT, 
    START_TIME,
    END_TIME, 
    CHECKOUT_INFO, 
    PAYMENT_SUCCESS_STATUS, 
    SERVICE_PAYMENT_SUCCESS_STATUS,
    SERVICE_FEE_PAYED } from '../const/SessionStorageConst';

export const getItem = (key) => {
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

export const handleStorage = (path, u, noRemove) => {
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

export const setAuthToken = (data) => {
    return sessionStorage.setItem(AUTH_TOKEN, data);
};

export const getSelectedLaunchArea = () => {
    return sessionStorage.getItem(SELECTED_LAUNCH_AREA);
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

export const getRetailerData = () => {
    const retailerDataString = sessionStorage.getItem(RETAILER_DATA);
    if (retailerDataString) {
        const cleaned = retailerDataString.replace(/&#34;/g, '"');
        const json = JSON.parse(cleaned);
        return json;
    };
    return {};
};

export const setServiceCost = (serviceCost) => {
    sessionStorage.setItem(SERVICE_COST, JSON.stringify(serviceCost));
};

export const getServiceCost = () => {
    const serviceCost = sessionStorage.getItem(SERVICE_COST);
    if (serviceCost) {
        const cleaned = serviceCost.replace(/&#34;/g, '"');
        const json = JSON.parse(cleaned);
        return json;
    }
    return {};
};

export const getStartTime = () => {
    const startTime = JSON.parse(sessionStorage.getItem(CHECKOUT_INFO))?.startTime || '';
    return startTime;
};

export const getEndTime = () => {
    const endTime = JSON.parse(sessionStorage.getItem(CHECKOUT_INFO))?.endTime || '' ;
    return endTime;
};

export const setStoreLogo = (file) => {
    sessionStorage.setItem(STORE_IMAGE, file);
};

export const setLicenseDocument = (file) => {
    sessionStorage.setItem(LICENSE_DOCUMENT, file);
};

export const getStoreImage = () => {
    return sessionStorage.getItem(STORE_IMAGE);
};

export const getLicenseDocument = () => {
    return sessionStorage.getItem(LICENSE_DOCUMENT);
};

export const setPaymentSuccess = () => {
    return sessionStorage.setItem(SERVICE_PAYMENT_SUCCESS_STATUS, SERVICE_FEE_PAYED);
};

export const getPaymentSuccess = () => {
    return sessionStorage.getItem(SERVICE_PAYMENT_SUCCESS_STATUS);
};

