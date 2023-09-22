'use strict';

import { createSlice } from '@reduxjs/toolkit';
import { getOverviewData } from '../thunk/overviewThunk';
    
const initialState = {
    overviewState: {}
};

const overviewSlice = createSlice({
    name: 'overview',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getOverviewData.fulfilled, (state, action) => {
            state.overviewState = action.payload;
        });
    }
});

export default overviewSlice.reducer;
