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
