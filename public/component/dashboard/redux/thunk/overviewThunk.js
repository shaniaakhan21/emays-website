'use strict';

import { createAsyncThunk } from '@reduxjs/toolkit';
import { loadOrders } from '../../../../services/dashboard/overview';
import { updateOverviewData } from '../slice/overviewSlice';

export const getOverviewData = createAsyncThunk('overview/getOverviewData', async (data) => {

    const loginData = data?.loginSelector;

    const response = await loadOrders({ pageNumber: data?.pageNumber
        , pageLimit: data?.pageLimit, token: loginData?.token });
    if (response) {
        console.log('Login Data', response);
        data?.dispatch(updateOverviewData({ ...response }));
    }
});

