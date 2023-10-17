'use strict';

import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginAnyUser } from '../../../../services/dashboard/login';
import { setAuthToken } from '../../../../js/util/SessionStorageUtil';

export const loginExe = createAsyncThunk('login/loginExe', async (data) => {
    const response = await loginAnyUser({ username: data.username, password: data.password });
    setAuthToken(response.token);
    if (response) {
        return response;
    }
});
