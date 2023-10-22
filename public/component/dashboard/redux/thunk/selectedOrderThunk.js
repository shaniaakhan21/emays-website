'use strict';

import { createAsyncThunk } from '@reduxjs/toolkit';

export const storeSelectedOrder = createAsyncThunk('selectedOrder/saveSelectedOrder', async (data, { getState }) => {

    const authToken = getState().loginState.token;
    if (authToken) {
        return data;
    }
    
});
