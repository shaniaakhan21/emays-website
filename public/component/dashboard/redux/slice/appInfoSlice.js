'use strict';

import { createSlice } from '@reduxjs/toolkit';
import { getAppInfoExe, getSystemInfoExe } from '../thunk/appInfoThunk';
    
const initialState = {
    appInfoState: {
        isLoading: true,
        data: {}
    },
    systemInfoState: {
        isLoading: true,
        data: {}
    }
};

const appInfoSlice = createSlice({
    name: 'appInfo',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getAppInfoExe.fulfilled, (state, action) => {
            state.appInfoState.data = action.payload;
            state.appInfoState.isLoading = false;
        });
        builder.addCase(getAppInfoExe.pending, (state, action) => {
            state.appInfoState.isLoading = true;
        });
        builder.addCase(getSystemInfoExe.fulfilled, (state, action) => {
            state.systemInfoState.data = action.payload;
            state.systemInfoState.isLoading = false;
        });
        builder.addCase(getSystemInfoExe.pending, (state, action) => {
            state.systemInfoState.isLoading = true;
        });
    }
});

export default appInfoSlice.reducer;
