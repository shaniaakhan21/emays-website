'use strict';

import { createAsyncThunk } from '@reduxjs/toolkit';
import { getDriverHistoryInfo, test } from '../../../../services/dashboard/driver';

export const getDriverHistoryData = createAsyncThunk('driverHistory/getHistory', async (data, { getState }) => {
    const authToken = getState().loginState.token;
    if (authToken) {
        const response = await getDriverHistoryInfo({
            page: data?.pageNumber,
            pageLimit: data?.pageLimit,
            driverId: data?.driverId,
            token: authToken
        });
        if (response) {
            return response;
        }
    }
});

