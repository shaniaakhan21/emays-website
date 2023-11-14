'use strict';

import { apiBase, HTTPHelper as httpUtil } from '../../js/util/httpUtil';

/**
 * Get driver info
 * @param token {string}
 * @returns {Promise<undefined|*>}
 */
export const getDriverInfo = ({ token }) => {
    return httpUtil.get(`${apiBase}/drivers/driverInfo`, {
        'Authorization': `Bearer ${token}`
    });
};
