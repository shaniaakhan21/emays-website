'use strict';

import { createAsyncThunk } from '@reduxjs/toolkit';
import { loadOverviewOrderStatsByStoreIdAndDuration } from '../../../../services/dashboard/overview';

export const getOverviewStatsData = createAsyncThunk('stats/getOverviewStats', async (data, { getState }) => {

    const storeId = getState().appInfoState?.systemInfoState?.data?.id;
    const authToken = getState().loginState.token;
    const response = await 
    loadOverviewOrderStatsByStoreIdAndDuration({ durationType: data?.durationType, storeId: storeId,
        token: authToken });
    if (response) {
        return response;
    }
});
