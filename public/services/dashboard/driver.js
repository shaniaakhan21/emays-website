'use strict';

import { apiBase, HTTPHelper as httpUtil } from '../../js/util/httpUtil';

/**
 * Get driver info
 * @param token {string}
 * @returns {Promise<undefined|*>}
 */
export const getDriverHistoryInfo = ({ page,
    pageLimit, driverId, token }) => {
    return httpUtil.get(`${apiBase}/drivers/driverHistory/${driverId}?page=${page}&pageLimit=${pageLimit}`, {
        'Authorization': `Bearer ${token}`
    });
};

/**
 * Save driver
 * @param token {string}
 * @param appData {object}
 * @returns {Promise<undefined|*>}
 */
export const saveDriver = ({ token, appData }) => {
    return httpUtil.post(`${apiBase}/drivers`, {
        'Authorization': `Bearer ${token}`
    }, { ...appData });
};
