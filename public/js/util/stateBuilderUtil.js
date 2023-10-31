'use strict';

import { ARCHIVED_CLASS, NEW_ORDER_CLASS, PENDING_TO_PICKUP, PENDING_TO_PICKUP_CLASS } from '../const/OrderStatus';

/**
 * Derive order status
 * TODO: we need to modify this in future to support more status
 */
export const getOrderStatus = ({ isCanceled, isPrepared, isDelivered, isDriverPicked }) => {
    if (isDelivered) {
        return ARCHIVED_CLASS;
    } else if (isPrepared) {
        return PENDING_TO_PICKUP_CLASS;
    } 
    return NEW_ORDER_CLASS;
};
