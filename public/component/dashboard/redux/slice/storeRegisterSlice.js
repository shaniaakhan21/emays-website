'use strict';

import { createSlice } from '@reduxjs/toolkit';
import { registerExternalSystem, resetAllStoreCreationData, 
    resetIsLoadingPhaseFour, resetIsLoadingPhaseOne, resetIsLoadingPhaseThree,
    resetIsLoadingPhaseTwo, resetIsLoadingPhaseTwoFiscal, setStageOneCreateStore,
    setStageThreeCreateStore, setStageTwoCreateStore, setStageTwoFiscalCreateStore } from '../thunk/newStoreThunk';
    
const initialState = {
    phaseOneData: {
        isLoading: true
    },
    phaseTwoData: {
        isLoading: true
    },
    phaseTwoFiscalData: {
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
        builder.addCase(setStageTwoFiscalCreateStore.pending, (state, action) => {
            state.phaseTwoFiscalData.isLoading = true;
        });
        builder.addCase(setStageTwoFiscalCreateStore.fulfilled, (state, action) => {
            state.phaseTwoFiscalData = action.payload;
            state.phaseTwoFiscalData.isLoading = false;
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
        builder.addCase(resetIsLoadingPhaseOne.fulfilled, (state, action) => {
            state.phaseOneData.isLoading = true;
        });
        builder.addCase(resetIsLoadingPhaseTwo.fulfilled, (state, action) => {
            state.phaseTwoData.isLoading = true;
        });
        builder.addCase(resetIsLoadingPhaseThree.fulfilled, (state, action) => {
            state.phaseThreeData.isLoading = true;
        });
        builder.addCase(resetIsLoadingPhaseFour.fulfilled, (state, action) => {
            state.saveStatus.isLoading = true;
        });
        builder.addCase(resetIsLoadingPhaseTwoFiscal.fulfilled, (state, action) => {
            state.phaseTwoFiscalData.isLoading = true;
        });
        builder.addCase(resetAllStoreCreationData.fulfilled, (state, action) => {
            state.phaseOneData = {};
            state.phaseOneData.isLoading = true;

            state.phaseTwoData = {};
            state.phaseTwoData.isLoading = true;

            state.phaseTwoFiscalData = {};
            state.phaseTwoFiscalData.isLoading = true;

            state.phaseThreeData = {};
            state.phaseThreeData.isLoading = true;

            state.saveStatus = {};
            state.isLoading = true;
        });
    }
});

export default newStoreSlice.reducer;
