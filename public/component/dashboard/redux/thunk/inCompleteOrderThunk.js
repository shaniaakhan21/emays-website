'use strict';

import { createAsyncThunk } from '@reduxjs/toolkit';
import { loadCompletedOrders, loadOrderById, loadOrders } from '../../../../services/dashboard/overview';

export const getInCompleteOrderData = createAsyncThunk('inCompleteOrder/getInCompleteOrderData', async (data, { getState }) => {

    const storeId = getState().appInfoState?.systemInfoState?.data?.id;
    const authToken = getState().loginState.token;
    const response = await loadOrders({ pageNumber: data?.pageNumber
        , pageLimit: data?.pageLimit, token: authToken, storeId: storeId });
    if (response) {
        return response;
    }
});

// This can be completed or inCompleted
export const getOrderDaDataById = createAsyncThunk('inCompleteOrder/getInCompleteOrderDataById', async (data, { getState }) => {

    const storeId = getState().appInfoState?.systemInfoState?.data?.id;
    const authToken = getState().loginState.token;
    const orderId = data?.orderId;
    const response = await loadOrderById({ orderId: orderId
        , storeId: storeId, token: authToken });
    if (response) {
        return response;
    }
});

