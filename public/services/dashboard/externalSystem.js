'use strict';

import { apiBase, HTTPHelper as httpUtil } from '../../js/util/httpUtil';

/**
 * Get store info by store id
 * @param storeId {string}
 * @param token {string}
 * @returns {Promise<undefined|*>}
 */
export const getStoreInfoByStoreId = ({ storeId, token }) => {
    if (storeId && token) {
        return httpUtil.post(`${apiBase}/stores/${storeId}`, {
            'Authorization': `Bearer ${token}`
        });
    }
};

/**
 * Get admin info by store id
 * @param storeId {string}
 * @param token {string}
 * @returns {Promise<undefined|*>}
 */
export const getAdminInfoByStoreId = ({ storeId, token }) => {
    if (storeId && token) {
        return httpUtil.get(`${apiBase}/adminExternalSystem/externalSystems/${storeId}`, {
            'Authorization': `Bearer ${token}`
        });
    }
};
