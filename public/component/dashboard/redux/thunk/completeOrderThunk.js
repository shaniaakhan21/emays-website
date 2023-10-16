'use strict';

import { createAsyncThunk } from '@reduxjs/toolkit';
import { loadCompletedOrders } from '../../../../services/dashboard/overview';

export const getCompletedOrderData = createAsyncThunk('completeOrder/getOverviewDataCompleted', async (data, { getState }) => {

    const storeId = getState().appInfoState?.systemInfoState?.data?.id;
    const authToken = getState().loginState.token;
    const response = await loadCompletedOrders({ storeId: storeId, token: authToken,
        pageNumber: data?.pageNumber
        , pageLimit: data?.pageLimit });
    if (response) {
        return response;
    }
});
