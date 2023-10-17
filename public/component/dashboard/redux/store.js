import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './slice/loginSlice';
import overviewReducer from './slice/overviewSlice';
import appInfoReducer from './slice/appInfoSlice';
import newOrderReducer from './slice/newOrderSlice';
import newStoreReducer from './slice/adminSlice';

const store = configureStore({
    reducer: {
        loginState: loginReducer,
        overviewState: overviewReducer,
        appInfoState: appInfoReducer,
        newOrderState: newOrderReducer,
        newStoreState: newStoreReducer
    }
});

export default store;
