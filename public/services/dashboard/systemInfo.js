'use strict';

import { apiBase, HTTPHelper as httpUtil } from '../../js/util/httpUtil';

/**
 * Load system info
 * @param token {string}
 * @returns {Promise<undefined|*>}
 */
export const getSystemInfo = ({ token }) => {
    return httpUtil.get(`${apiBase}/externalSystems/systemInfo`, {
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
