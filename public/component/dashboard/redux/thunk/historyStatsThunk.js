'use strict';

import { createAsyncThunk } from '@reduxjs/toolkit';
import { loadHistoryStatsByStoreIdAndDuration } from '../../../../services/dashboard/overview';

export const getHistoryStatsData = createAsyncThunk('stats/getHistoryStats', async (data, { getState }) => {

    const storeId = getState().appInfoState?.systemInfoState?.data?.id;
    const authToken = getState().loginState.token;
    const response = await loadHistoryStatsByStoreIdAndDuration({ durationType: 1, storeId: storeId,
        token: authToken });
    if (response) {
        return response;
    }
});
