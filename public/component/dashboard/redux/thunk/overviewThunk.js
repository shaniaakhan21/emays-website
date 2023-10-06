'use strict';

import { createAsyncThunk } from '@reduxjs/toolkit';
import { loadOrderById, loadOrders } from '../../../../services/dashboard/overview';

export const getOverviewData = createAsyncThunk('overview/getOverviewData', async (data, { getState }) => {

    const storeId = getState().appInfoState?.systemInfoState?.data?.id;
    const authToken = getState().loginState.token;
    const response = await loadOrders({ pageNumber: data?.pageNumber
        , pageLimit: data?.pageLimit, token: authToken, storeId: storeId });
    if (response) {
        return response;
    }
});

export const getOverviewDataById = createAsyncThunk('overview/getOverviewDataById', async (data, { getState }) => {

    const storeId = getState().appInfoState?.systemInfoState?.data?.id;
    const authToken = getState().loginState.token;
    const orderId = data?.orderId;
    const response = await loadOrderById({ orderId: orderId
        , storeId: storeId, token: authToken });
    if (response) {
        return response;
    }
});
