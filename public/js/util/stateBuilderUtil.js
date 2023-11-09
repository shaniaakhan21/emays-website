'use strict';

import { ARCHIVED_CLASS, ITEMS_TO_BE_RETURNED_CLASS, NEW_ORDER_CLASS,
    ON_DELIVERY_CLASS, PENDING_TO_PICKUP, PENDING_TO_PICKUP_CLASS } from '../const/OrderStatus';

/**
 * Derive order status
 * TODO: we need to modify this in future to support more status
 */
export const getOrderStatus = ({ isCanceled, isPrepared, isDelivered, isDriverPicked, isDriverApproved }) => {
    if (isDelivered) {
        return ARCHIVED_CLASS;
    } else if (isDriverPicked) {
        return ON_DELIVERY_CLASS;
    } else if (isDriverApproved) {
        return ITEMS_TO_BE_RETURNED_CLASS;
    } else if (isPrepared) {
        return PENDING_TO_PICKUP_CLASS;
    }
    return NEW_ORDER_CLASS;
};
