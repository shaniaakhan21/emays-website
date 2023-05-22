'use strict';

import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginSuperUser } from '../../../../services/dashboard/login';
import { login } from '../slice/loginSlice';

export const loginExe = createAsyncThunk('login/loginExe', async (data) => {
    const response = await loginSuperUser({ username: data.username, password: data.password });
    if (response) {
        data.dispatch(login(response?.token));
    }
});
