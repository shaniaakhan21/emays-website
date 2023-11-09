import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './slice/loginSlice';
import inCompleteOrderReducer from './slice/inCompleteOrderSlice';
import completeOrderReducer from './slice/completeOrderSlice';
import appInfoReducer from './slice/appInfoSlice';
import newOrderReducer from './slice/newOrderSlice';
import newStoreReducer from './slice/storeRegisterSlice';
import selectedOrderReducer from './slice/selectedOrderSlice';
import driverSelectedOrderReducer from './slice/driverSelectedOrderSlice';
import statsReducer from './slice/statsSlice';
import newDriverReducer from './slice/driverRegisterSlice';

const store = configureStore({
    reducer: {
        loginState: loginReducer,
        inCompleteOrderState: inCompleteOrderReducer,
        completeOrderState: completeOrderReducer,
        appInfoState: appInfoReducer,
        newOrderState: newOrderReducer,
        newStoreState: newStoreReducer,
        newDriverState: newDriverReducer,
        selectedOrderState: selectedOrderReducer,
        driverSelectedOrderState: driverSelectedOrderReducer,
        statsState: statsReducer
    }
});

export default store;
