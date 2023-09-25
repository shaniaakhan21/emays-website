'use strict';

import { createAsyncThunk } from '@reduxjs/toolkit';
import { getSystemInfo } from '../../../../services/dashboard/systemInfo';

export const getSystemInfoExe = createAsyncThunk('system/getSystemInfo', async (data, { getState }) => {
    const authToken = getState().loginState.token;
    const response = await getSystemInfo({ token: authToken });
    if (response) {
        console.log('System INFO;;;', response);
        return response;
    }
});
