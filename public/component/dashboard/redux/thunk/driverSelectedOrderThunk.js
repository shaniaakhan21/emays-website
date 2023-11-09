'use strict';

import { createAsyncThunk } from '@reduxjs/toolkit';
import { patchOrderByOrderId } from '../../../../services/dashboard/order';
import { getAdminInfoByStoreId, getStoreInfoByStoreId } from '../../../../services/dashboard/externalSystem';

export const storeSelectedOrder = createAsyncThunk('driverSelectedOrder/saveSelectedOrder', async (data, { getState }) => {
    const authToken = getState().loginState.token;
    if (authToken) {
        return data;
    }
});

export const changeStatusSelectedOrder = createAsyncThunk('driverSelectedOrder/changeStatusSelectedOrder', async (data, { getState }) => {
    const authToken = getState().loginState.token;
    if (authToken) {
        const result = 
        await patchOrderByOrderId({ token: authToken, orderId: data?.orderId, orderObject: data?.patchData });
        if (result) {
            return { patchedStatus: true };
        } 
        return { patchedStatus: false };
    }
});

export const getStoreInformationByStoreId = createAsyncThunk('driverSelectedOrder/getStoreInfo', async (data, { getState }) => {
    const authToken = getState().loginState.token;
    if (authToken) {
        const result = 
        await getStoreInfoByStoreId({ token: authToken, storeId: data?.storeId });
        return result;
    }
});

export const getAdminByStoreId = createAsyncThunk('driverSelectedOrder/getAdminInfo', async (data, { getState }) => {
    const authToken = getState().loginState.token;
    if (authToken) {
        const result = 
        await getAdminInfoByStoreId({ token: authToken, storeId: data?.storeId });
        return result;
    }
});
