'use strict';

import { apiBase, HTTPHelper as httpUtil } from '../../js/util/httpUtil';

/**
 * Load user orders with pagination
 * @param pageNumber {number}
 * @param pageLimit {number}
 * @param storeId {string}
 * @param token {string}
 * @returns {Promise<undefined|*>}
 */
export const loadOrdersCompleted = ({ pageNumber, pageLimit, storeId, token }) => {
    if (storeId) {
        // eslint-disable-next-line max-len
        return httpUtil.get(`${apiBase}/orders/pagination?page=${pageNumber}&pageLimit=${pageLimit}&storeId=${storeId}&isCompleted=false`, {
            'Authorization': `Bearer ${token}`
        }, {});
    }
    return httpUtil.get(`${apiBase}/orders/pagination?page=${pageNumber}&pageLimit=${pageLimit}&isCompleted=false`, {
        'Authorization': `Bearer ${token}`
    }, {});
};

/*
 * Load completed user orders with pagination
 * @param pageNumber {number}
 * @param pageLimit {number}
 * @param storeId {string}
 * @param token {string}
 * @returns {Promise<undefined|*>}
 */
export const loadCompletedOrders = ({ pageNumber, pageLimit, storeId, token }) => {
    if (storeId) {
        // eslint-disable-next-line max-len
        return httpUtil.get(`${apiBase}/orders/pagination?page=${pageNumber}&pageLimit=${pageLimit}&storeId=${storeId}&isCompleted=true`, {
            'Authorization': `Bearer ${token}`
        }, {});
    }
    return httpUtil.get(`${apiBase}/orders/pagination?page=${pageNumber}&pageLimit=${pageLimit}&isCompleted=true`, {
        'Authorization': `Bearer ${token}`
    }, {});
};

/**
 * Load user orders by order id
 * @param orderId {number}
 * @param storeId {string}
 * @param token {string}
 * @returns {Promise<undefined|*>}
 */
export const loadOrderById = ({ orderId, storeId, token }) => {
    if (storeId) {
        // Point: branchId = storeId in our system
        return httpUtil.get(`${apiBase}/orders/byOrderId/${orderId}?branchId=${storeId}`, {
            'Authorization': `Bearer ${token}`
        }, {});
    }
    return httpUtil.get(`${apiBase}/orders/byOrderId/${orderId}`, {
        'Authorization': `Bearer ${token}`
    }, {});
};

/**
 * Load order history stats by order id
 * @param orderId {number}
 * @param storeId {string}
 * @param token {string}
 * @returns {Promise<undefined|*>}
 */
export const loadHistoryStatsByStoreIdAndDuration = ({ durationType, storeId, token }) => {
    if (storeId) {
        // Point: branchId = storeId in our system
        return httpUtil.get(`${apiBase}/externalSystems/externalSystemsStatsHistory?durationType=${durationType}`, {
            'Authorization': `Bearer ${token}`
        }, {});
    }
    return httpUtil.get(`${apiBase}/externalSystems/externalSystemsStatsHistory?durationType=${durationType}`, {
        'Authorization': `Bearer ${token}`
    }, {});
};

/**
 * Load order history stats by order id
 * @param orderId {number}
 * @param storeId {string}
 * @param token {string}
 * @returns {Promise<undefined|*>}
 */
export const loadDeliveryOrderStatsByStoreIdAndDuration = ({ durationType, storeId, token }) => {
    if (storeId) {
        // Point: branchId = storeId in our system
        // eslint-disable-next-line max-len
        return httpUtil.get(`${apiBase}/externalSystems/externalSystemsStatsDeliveryOrder?durationType=${durationType}`, {
            'Authorization': `Bearer ${token}`
        }, {});
    }
    return httpUtil.get(`${apiBase}/externalSystems/externalSystemsStatsDeliveryOrder?durationType=${durationType}`, {
        'Authorization': `Bearer ${token}`
    }, {});
};
