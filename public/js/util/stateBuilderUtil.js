'use strict';

import { ARCHIVED_CLASS, NEW_ORDER_CLASS } from '../const/OrderStatus';

/**
 * Derive order status
 * TODO: we need to modify this in future to support more status
 */
export const getOrderStatus = ({ isCanceled, isDelivered, isDriverPicked }) => {
    if (isDelivered) {
        return ARCHIVED_CLASS;
    } 
    return NEW_ORDER_CLASS;
};
