import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './slice/loginSlice';
import overviewReducer from './slice/overviewSlice';
import appInfoReducer from './slice/appInfoSlice';

const store = configureStore({
    reducer: {
        loginState: loginReducer,
        overviewState: overviewReducer,
        appInfoState: appInfoReducer
    }
});

export default store;
