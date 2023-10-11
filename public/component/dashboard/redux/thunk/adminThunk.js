'use strict';

import { createAsyncThunk } from '@reduxjs/toolkit';
import { checkUsernameValidityForAccountCreation, saveExternalSystem } from '../../../../services/dashboard/systemInfo';
import { getAuthToken, getStoreImage } from '../../../../js/util/SessionStorageUtil';

export const setStageOneCreateStore = createAsyncThunk('newStore/phaseOne', async (data, { getState }) => {
    const authToken = getState().loginState.token;
    if (authToken) {
        return data;
    }
});

export const setStageTwoCreateStore = createAsyncThunk('newStore/phaseTwo', async (data, { getState }) => {
    const authToken = getState().loginState.token;
    if (authToken) {
        return data;
    }
});

export const setStageThreeCreateStore = createAsyncThunk('newStore/phaseThree', async (data, { getState }) => {
    const authToken = getState().loginState.token;
    if (authToken) {
        return data;
    }
});

export const registerExternalSystem = createAsyncThunk('newStore/saveExternalSystem', async (data, { getState }) => {
    const authToken = getState().loginState.token;
    const appDataPrepared = {
        extSysName: data?.phaseOne?.storeName,
        extSysUsername: data?.phaseThree?.username,
        extSysPassword: data?.phaseThree?.password,
        extSysEmail: data?.phaseThree?.email,
        extSysAddress: data?.phaseOne?.address,
        extLogo: getStoreImage()

    };
    if (authToken) {
        const response = saveExternalSystem({ token: authToken, appData: appDataPrepared });
        return response;
    }
});

// Register manager and Admin

export const checkUsernameValidity = async (data) => {
    const authToken = getAuthToken();
    if (authToken) {
        const response = await checkUsernameValidityForAccountCreation({ token: authToken, appData: data });
        return response;
    }
};
