'use strict';

import { createAsyncThunk } from '@reduxjs/toolkit';
import { getSystemInfo, getAppInfo } from '../../../../services/dashboard/systemInfo';

export const getSystemInfoExe = createAsyncThunk('appInfo/getSystemInfo', async (data, { getState }) => {
    const authToken = getState().loginState.token;
    const response = await getSystemInfo({ token: authToken });
    if (response) {
        console.log('System INFO;;;', response);
        return response;
    }
});

export const getAppInfoExe = createAsyncThunk('appInfo/getAppInfo', async (data, { getState }) => {
    const authToken = getState().loginState.token;
    const response = await getAppInfo({ token: authToken });
    if (response) {
        console.log('App INFO;;;', response);
        return response;
    }
});
