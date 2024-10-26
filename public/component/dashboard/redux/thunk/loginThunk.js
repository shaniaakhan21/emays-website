'use strict';

import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginAnyUser } from '../../../../services/dashboard/login';
import { setAuthToken } from '../../../../js/util/SessionStorageUtil';
import { getDriverInfo } from '../../../../services/dashboard/userInfo';
import { getAuthTokenLocalStorage, setAuthTokenLocalStorage,
    setLoginResponseLocalStorage, getLoginResponseLocalStorage } from '../../../../js/util/LocalStorageUtil';

export const loginExe = createAsyncThunk('login/loginExe', async (data) => {
    /*
     * Const localStorageAuthToken = getAuthTokenLocalStorage();
     * const localStorageLoginResponse = getLoginResponseLocalStorage();
     * if (localStorageAuthToken) {
     *     setAuthToken(response.token);
     *     return localStorageLoginResponse;
     * }
     */
    const response = await loginAnyUser({ username: data.username, password: data.password });
    if (response.roles === 'driver') {
        const userData = await getDriverInfo({ token: response.token });
        response['userInfo'] = userData;
    }
    setAuthToken(response.token);
    setAuthTokenLocalStorage(response.token);
    setLoginResponseLocalStorage(response);
    if (response) {
        return response;
    }
});

export const logoutExe = createAsyncThunk('login/logOutExe', async (data) => {
    return true;
});
