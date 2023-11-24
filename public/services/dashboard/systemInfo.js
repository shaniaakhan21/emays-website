'use strict';

import { validateUsername, validateUsernameErrorBuilder } from '../../js/util/errorBuilder';
import { apiBase, HTTPHelper as httpUtil } from '../../js/util/httpUtil';

/**
 * Load system info
 * @param token {string}
 * @returns {Promise<undefined|*>}
 */
export const getSystemInfo = ({ token }) => {
    return httpUtil.post(`${apiBase}/externalSystems/systemInfo`, {
        'Authorization': `Bearer ${token}`
    }, {});
};

/**
 * Load app info
 * @param token {string}
 * @returns {Promise<undefined|*>}
 */
export const getAppInfo = ({ token }) => {
    return httpUtil.get(`${apiBase}/appInfo`, {
        'Authorization': `Bearer ${token}`
    }, {});
};

/**
 * Save external system
 * @param token {string}
 * @param appData {object}
 * @returns {Promise<undefined|*>}
 */
export const saveExternalSystem = ({ token, appData }) => {
    return httpUtil.post(`${apiBase}/externalSystems`, {
        'Authorization': `Bearer ${token}`
    }, { ...appData });
};

/**
 * Save admin for external system system
 * @param token {string}
 * @param appData {object}
 * @returns {Promise<undefined|*>}
 */
export const saveAdminExternalSystem = ({ token, appData }) => {
    return httpUtil.post(`${apiBase}/adminExternalSystem`, {
        'Authorization': `Bearer ${token}`
    }, { ...appData });
};

/**
 * Save manager for external system system
 * @param token {string}
 * @param appData {object}
 * @returns {Promise<undefined|*>}
 */
export const saveManagerExternalSystem = ({ token, appData }) => {
    return httpUtil.post(`${apiBase}/managerExternalSystem`, {
        'Authorization': `Bearer ${token}`
    }, { ...appData });
};

/**
 * Check username validity
 * @param token {string}
 * @param appData {object}
 * @returns {Promise<undefined|*>}
 */
export const checkUsernameValidityForAccountCreation = ({ token, appData }) => {
    return httpUtil.post(`${apiBase}/externalSystems/usernameValidity`, {
        'Authorization': `Bearer ${token}`
    }, { ...appData }).catch((error) => {
        return {
            error: validateUsernameErrorBuilder(error?.message)
        };
    });
};
