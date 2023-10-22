import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './slice/loginSlice';
import inCompleteOrderReducer from './slice/inCompleteOrderSlice';
import completeOrderReducer from './slice/completeOrderSlice';
import appInfoReducer from './slice/appInfoSlice';
import newOrderReducer from './slice/newOrderSlice';
import newStoreReducer from './slice/adminSlice';
import selectedOrderReducer from './slice/selectedOrderSlice';
import statsReducer from './slice/statsSlice';

const store = configureStore({
    reducer: {
        loginState: loginReducer,
        inCompleteOrderState: inCompleteOrderReducer,
        completeOrderState: completeOrderReducer,
        appInfoState: appInfoReducer,
        newOrderState: newOrderReducer,
        newStoreState: newStoreReducer,
        selectedOrderState: selectedOrderReducer,
        statsState: statsReducer
    }
});

export default store;
