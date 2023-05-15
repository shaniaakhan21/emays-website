'use strict';

import { apiBase, HTTPHelper as httpUtil } from '../../js/util/httpUtil';

/**
 * Load user orders with pagination
 * @param pageNumber {number}
 * @param pageLimit {number}
 * @param token {string}
 * @returns {Promise<undefined|*>}
 */
export const loadOrders = ({ pageNumber, pageLimit, token }) => {
    return httpUtil.get(`${apiBase}/orders?page=${pageNumber}&pageLimit=${pageLimit}`, {
        'Authorization': `Bearer ${token}`
    }, {});
};
