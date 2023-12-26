'use strict';

import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAuthToken, getLicenseDocument } from '../../../../js/util/SessionStorageUtil';
import { checkUsernameValidityForAccountCreation, saveExternalSystem } from '../../../../services/dashboard/systemInfo';
import { saveDriver } from '../../../../services/dashboard/driver';

// -----------------CREATE DRIVER-------------------

export const setStageOneCreateDriver = createAsyncThunk('newDriver/phaseOne', async (data, { getState }) => {
    const authToken = getState().loginState.token;
    if (authToken) {
        return data;
    }
});

export const setStageTwoCreateDriver = createAsyncThunk('newDriver/phaseTwo', async (data, { getState }) => {
    const authToken = getState().loginState.token;
    if (authToken) {
        return data;
    }
});

export const setStageThreeCreateDriver = createAsyncThunk('newDriver/phaseThree', async (data, { getState }) => {
    const authToken = getState().loginState.token;
    if (authToken) {
        return data;
    }
});

export const setStageFourCreateDriver = createAsyncThunk('newDriver/phaseFour', async (data, { getState }) => {
    const authToken = getState().loginState.token;
    if (authToken) {
        return data;
    }
});

export const resetIsLoadingPhaseOne = createAsyncThunk('newDriver/resetPhaseOne', async (data, { getState }) => {
    const authToken = getState().loginState.token;
    if (authToken) {
        return true;
    }
});

export const resetIsLoadingPhaseTwo = createAsyncThunk('newDriver/resetPhaseTwo', async (data, { getState }) => {
    const authToken = getState().loginState.token;
    if (authToken) {
        return true;
    }
});

export const resetIsLoadingPhaseThree = createAsyncThunk('newDriver/resetPhaseThree', async (data, { getState }) => {
    const authToken = getState().loginState.token;
    if (authToken) {
        return true;
    }
});

export const resetIsLoadingPhaseFour = createAsyncThunk('newDriver/resetPhaseFour', async (data, { getState }) => {
    const authToken = getState().loginState.token;
    if (authToken) {
        return true;
    }
});

export const checkUsernameValidity = async (data) => {
    const authToken = getAuthToken();
    if (authToken) {
        const response = await checkUsernameValidityForAccountCreation({ token: authToken, appData: data });
        return response;
    }
};

// Register driver
export const registerDriver = createAsyncThunk('newDriver/saveDriver', async (data, { getState }) => {
    const authToken = getState().loginState.token;
    if (authToken) {
        const preparedData = {
            firstName: data?.phaseOneData?.firstName,
            lastName: data?.phaseOneData?.lastName,
            phoneNumber: data?.phaseOneData?.phoneNumber,
            address: {
                city: data?.phaseOneData?.city,
                country: data?.phaseOneData?.country,
                zipCode: data?.phaseOneData?.zipCode
            },
            license: {
                licenseNumber: data?.phaseTwoData?.licenseNumber,
                carModel: data?.phaseTwoData?.carModel,
                carPlate: data?.phaseTwoData?.carPlate,
                licenseDoc: getLicenseDocument()
            },
            billing: {
                address: data?.phaseThreeData?.billingAddress,
                email: data?.phaseThreeData?.billingEmail,
                bankName: data?.phaseThreeData?.bankName,
                accountNumber: data?.phaseThreeData?.accountNumber,
                swiftNumber: data?.phaseThreeData?.swiftNumber,
                paymentCurrency: data?.phaseThreeData?.paymentCurrency,
                country: data?.phaseThreeData?.country
            },
            driverUsername: data?.phaseFourData?.username,
            driverPassword: data?.phaseFourData?.password,
            driverEmail: data?.phaseFourData?.email
        };

        const response = await saveDriver({ token: authToken, appData: preparedData });
        if (response) {
            return response;
        }
    }
});

export const resetAllDriverCreationData = createAsyncThunk('newDriver/resetAll', async (data, { getState }) => {
    const authToken = getState().loginState.token;
    if (authToken) {
        return true;
    }
});

