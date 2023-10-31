'use strict';

import { apiBase, HTTPHelper as httpUtil } from '../../js/util/httpUtil';

/**
 * Patch order by order id
 * @param orderId {string}
 * @param orderObject {object}
 * @param token {string}
 * @returns {Promise<undefined|*>}
 */
export const patchOrderByOrderId = ({ orderId, orderObject, token }) => {
    if (orderId && orderObject && Object.keys(orderObject).length > 0) {
        return httpUtil.patch(`${apiBase}/patch/orders/${orderId}`, {
            'Authorization': `Bearer ${token}`
        }, { ...orderObject });
    }
};
