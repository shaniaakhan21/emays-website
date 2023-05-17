'use strict';

import { createSlice } from '@reduxjs/toolkit';
    
const initialState = {
    data: {}
};

const overviewSlice = createSlice({
    name: 'overview',
    initialState,
    reducers: {
        updateOverviewData (state, action) {
            state.data = action.payload;
        }
    }
});

export const { updateOverviewData } = overviewSlice.actions;
export default overviewSlice.reducer;
