'use strict';

import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginAnyUser } from '../../../../services/dashboard/login';

export const loginExe = createAsyncThunk('login/loginExe', async (data) => {
    const response = await loginAnyUser({ username: data.username, password: data.password });
    if (response) {
        return response;
    }
});
