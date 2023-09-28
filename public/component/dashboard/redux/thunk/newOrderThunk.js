'use strict';

import { createAsyncThunk } from '@reduxjs/toolkit';

export const setNewOrderPhaseOneData = createAsyncThunk('newOrder/phaseOne', async (data, { getState }) => {
    const authToken = getState().loginState.token;
    if (authToken) {
        return data;
    }
});

