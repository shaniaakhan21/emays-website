'use strict';

import { createAsyncThunk } from '@reduxjs/toolkit';

export const driverSelectFinal = createAsyncThunk('driverFinalSelection/select', async (data, { getState }) => {
    const authToken = getState().loginState.token;
    if (authToken) {
        return data;
    }
});
