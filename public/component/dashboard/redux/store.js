import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './slice/loginSlice';
import overviewReducer from './slice/overviewSlice';

const store = configureStore({
    reducer: {
        loginState: loginReducer,
        overviewState: overviewReducer
    }
});

export default store;
