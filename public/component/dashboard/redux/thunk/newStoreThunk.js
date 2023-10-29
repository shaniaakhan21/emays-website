'use strict';

import { createAsyncThunk } from '@reduxjs/toolkit';
import { checkUsernameValidityForAccountCreation,
    saveAdminExternalSystem, saveExternalSystem,
    saveManagerExternalSystem } from '../../../../services/dashboard/systemInfo';
import { getAuthToken, getStoreImage } from '../../../../js/util/SessionStorageUtil';

// -----------------CREATE STORE-------------------

export const setStageOneCreateStore = createAsyncThunk('newStore/phaseOne', async (data, { getState }) => {
    const authToken = getState().loginState.token;
    if (authToken) {
        return data;
    }
});

export const resetIsLoadingPhaseOne = createAsyncThunk('newStore/resetPhaseOne', async (data, { getState }) => {
    const authToken = getState().loginState.token;
    if (authToken) {
        return true;
    }
});

export const setStageTwoCreateStore = createAsyncThunk('newStore/phaseTwo', async (data, { getState }) => {
    const authToken = getState().loginState.token;
    if (authToken) {
        return data;
    }
});

export const setStageTwoFiscalCreateStore = createAsyncThunk('newStore/phaseTwoFiscal', async (data, { getState }) => {
    const authToken = getState().loginState.token;
    if (authToken) {
        return data;
    }
});

export const resetIsLoadingPhaseTwo = createAsyncThunk('newStore/resetPhaseTwo', async (data, { getState }) => {
    const authToken = getState().loginState.token;
    if (authToken) {
        return true;
    }
});

export const resetIsLoadingPhaseTwoFiscal = createAsyncThunk('newStore/resetPhaseTwoFiscal', async (data, { getState }) => {
    const authToken = getState().loginState.token;
    if (authToken) {
        return true;
    }
});

export const setStageThreeCreateStore = createAsyncThunk('newStore/phaseThree', async (data, { getState }) => {
    const authToken = getState().loginState.token;
    if (authToken) {
        return data;
    }
});

export const resetIsLoadingPhaseThree = createAsyncThunk('newStore/resetPhaseThree', async (data, { getState }) => {
    const authToken = getState().loginState.token;
    if (authToken) {
        return true;
    }
});

// Register manager and Admin
export const registerExternalSystem = createAsyncThunk('newStore/saveExternalSystem', async (data, { getState }) => {
    const authToken = getState().loginState.token;
    const appDataPreparedForStore = {
        extSysName: data?.phaseTwo?.storeName,
        extSysUsername: data?.phaseOne?.username,
        extSysPassword: data?.phaseOne?.password,
        extSysEmail: data?.phaseOne?.email,
        extSysAddress: data?.phaseTwo?.address,
        extLogo: getStoreImage(),
        fiscalInfo: data?.phaseTwoFiscal

    };
    const appDataPreparedForAdmin = {
        adminFirstName: data?.phaseThree?.businessAdmin?.adminName,
        adminLastName: data?.phaseThree?.businessAdmin?.adminName,
        adminUsername: data?.phaseThree?.businessAdmin?.adminUsername,
        adminPassword: data?.phaseThree?.businessAdmin?.adminPassword,
        adminPhone: data?.phaseThree?.businessAdmin?.adminPhone,
        adminEmail: data?.phaseThree?.businessAdmin?.adminEmail,
        externalSystemId: ''
    };
    const appDataPreparedForManager = {
        managerFirstName: data?.phaseThree?.manager?.managerName,
        managerLastName: data?.phaseThree?.manager?.managerName,
        managerUsername: data?.phaseThree?.manager?.managerUsername,
        managerPassword: data?.phaseThree?.manager?.managerPassword,
        managerPhone: data?.phaseThree?.manager?.managerPhone,
        managerEmail: data?.phaseThree?.manager?.managerEmail,
        externalSystemId: ''
    };
    if (authToken) {
        const response = await saveExternalSystem({ token: authToken, appData: appDataPreparedForStore });
        const sysId = response?.sysId;
        let resultManager;
        let resultAdmin;
        if (sysId) {
            appDataPreparedForAdmin.externalSystemId = response?.sysId;
            appDataPreparedForManager.externalSystemId = response?.sysId;
            resultManager = 
            await saveManagerExternalSystem({ token: authToken, appData: appDataPreparedForManager });
            resultAdmin = 
            await saveAdminExternalSystem({ token: authToken, appData: appDataPreparedForAdmin });
        }
        const finalResult = {
            resultAdmin: resultAdmin,
            resultManager: resultManager,
            resultStore: response
        };
        return finalResult;
    }
});

export const checkUsernameValidity = async (data) => {
    const authToken = getAuthToken();
    if (authToken) {
        const response = await checkUsernameValidityForAccountCreation({ token: authToken, appData: data });
        return response;
    }
};
