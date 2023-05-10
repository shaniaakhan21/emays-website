import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './slice/loginSlice';

const store = configureStore({
    reducer: {
        loginState: loginReducer
    }
});

export default store;
