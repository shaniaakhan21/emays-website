import React from 'react';
import LoginWrapper from './login/LoginWrapper';
import { useSelector } from 'react-redux';
import RetailerLogin from './login/Login';
import { loginSelector } from './redux/selector/loginSelector';
import DashboardLayout from './DashboardLayout';

const Dashboard = () => {

    const loginStatusStore = useSelector(loginSelector);

    return (
        loginStatusStore?.isSuccess ? <DashboardLayout/> : <LoginWrapper uri={''}
            loginComponent={RetailerLogin}
            wrapperStyle={ { backgroundColor: '#231F20', height: '100vh'
                , display: 'flex', alignItems: 'center', justifyContent: 'center' } } />
    );
    
};

export default React.memo(Dashboard);
