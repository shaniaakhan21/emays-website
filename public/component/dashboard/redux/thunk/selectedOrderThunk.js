'use strict';

import { createAsyncThunk } from '@reduxjs/toolkit';
import { patchOrderByOrderId } from '../../../../services/dashboard/order';

export const storeSelectedOrder = createAsyncThunk('selectedOrder/saveSelectedOrder', async (data, { getState }) => {
    const authToken = getState().loginState.token;
    if (authToken) {
        return data;
    }
});

export const changeStatusSelectedOrder = createAsyncThunk('selectedOrder/changeStatusSelectedOrder', async (data, { getState }) => {
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
