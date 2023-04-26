import { apiBase, HTTPHelper as httpUtil } from '../js/util/httpUtil';

export const saveOrder = (order) => {
    return httpUtil.post(`${apiBase}/orders`, {}, order);
};

/**
 * Update order
 * @param uid {string} uuid of order
 * @param order {any} updated order info
 * @returns {Promise<undefined|*>}
 */
export const updateOrder = (uid, order) => {
    return httpUtil.patch(`${apiBase}/orders/${uid}`, {}, order);
};

/**
 * Cancel order
 * @param uid {string} uuid of order
 * @param order {any} updated order info
 * @returns {Promise<undefined|*>}
 */
export const cancelOrder = (uid) => {
    return httpUtil.patch(`${apiBase}/orders/${uid}`, {}, { isCanceled: true });
};
