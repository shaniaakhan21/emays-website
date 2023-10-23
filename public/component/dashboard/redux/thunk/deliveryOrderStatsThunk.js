'use strict';

import { createAsyncThunk } from '@reduxjs/toolkit';
import { loadDeliveryOrderStatsByStoreIdAndDuration } from '../../../../services/dashboard/overview';

export const getDeliveryOrderStatsData = createAsyncThunk('stats/getDeliveryOrderStats', async (data, { getState }) => {

    const storeId = getState().appInfoState?.systemInfoState?.data?.id;
    const authToken = getState().loginState.token;
    const response = await loadDeliveryOrderStatsByStoreIdAndDuration({ durationType: 1, storeId: storeId,
        token: authToken });
    if (response) {
        return response;
    }
});
