'use strict';

import { USER_DATA, RETAILER_DATA, SERVICE_COST, AUTH_TOKEN } from '../const/SessionStorageConst';

export const loadLocalStorage = (path, setStateFn) => {
    const data = sessionStorage?.getItem(path);
    if (data) {
        setStateFn?.(JSON.parse(data));
        return JSON.parse(data);
    }
    return null;
};

export const handleStorage = (path, u, noRemove) => {
    if (u) {
        sessionStorage?.setItem(path, JSON.stringify(u));
    } else if (!noRemove) {
        sessionStorage?.removeItem(path);
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

export const getAuthToken = () => {
    return sessionStorage?.getItem(AUTH_TOKEN);
};

export const getUserData = () => {
    const userDataString = sessionStorage.getItem(USER_DATA);
    const cleaned = userDataString.replace(/&#34;/g, '"');
    const json = JSON.parse(cleaned);
    return json;
};

export const getRetailerData = () => {
    const retailerDataString = sessionStorage.getItem(RETAILER_DATA);
    const cleaned = retailerDataString.replace(/&#34;/g, '"');
    const json = JSON.parse(cleaned);
    return json;
};

export const setServiceCost = (serviceCost) => {
    sessionStorage.setItem(SERVICE_COST, JSON.stringify(serviceCost));
};

export const getServiceCost = () => {
    return sessionStorage.getItem(SERVICE_COST);
};
