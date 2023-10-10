'use strict';

import { createSlice } from '@reduxjs/toolkit';
import { registerExternalSystem, setStageOneCreateStore,
    setStageThreeCreateStore, setStageTwoCreateStore } from '../thunk/adminThunk';
    
const initialState = {
    phaseOneData: {
        isLoading: true
    },
    phaseTwoData: {
        isLoading: true
    },
    phaseThreeData: {
        isLoading: true
    },
    saveStatus: {
        isLoading: true
    }
};

const newStoreSlice = createSlice({
    name: 'newStore',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(setStageOneCreateStore.fulfilled, (state, action) => {
            state.phaseOneData = action.payload;
            state.phaseOneData.isLoading = false;
        });
        builder.addCase(setStageOneCreateStore.pending, (state, action) => {
            state.phaseOneData.isLoading = true;
        });
        builder.addCase(setStageTwoCreateStore.fulfilled, (state, action) => {
            state.phaseTwoData = action.payload;
            state.phaseTwoData.isLoading = false;
        });
        builder.addCase(setStageTwoCreateStore.pending, (state, action) => {
            state.phaseTwoData.isLoading = true;
        });
        builder.addCase(setStageThreeCreateStore.fulfilled, (state, action) => {
            state.phaseThreeData = action.payload;
            state.phaseThreeData.isLoading = false;
        });
        builder.addCase(setStageThreeCreateStore.pending, (state, action) => {
            state.phaseThreeData.isLoading = true;
        });
        builder.addCase(registerExternalSystem.fulfilled, (state, action) => {
            state.saveStatus.result = action.payload;
            state.saveStatus.isLoading = false;
        });
        builder.addCase(registerExternalSystem.pending, (state, action) => {
            state.saveStatus.isLoading = true;
        });
    }
});

export default newStoreSlice.reducer;
