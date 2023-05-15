import React from 'react';
import LoginWrapper from './login/LoginWrapper';
import { useSelector } from 'react-redux';
import RetailerLogin from './login/Login';
import { useEffect, useState } from 'react';
import { loginSelector } from './redux/selector/loginSelector';
import DashboardLayout from './DashboardLayout';

const Dashboard = () => {

    const [loginStatus, setLoginStatus] = useState(null);
    const loginStatusStore = useSelector(loginSelector);

    useEffect(() => {
        setLoginStatus(loginStatusStore);
        const main = document.getElementsByTagName('main')[0];
        main?.classList?.add?.('retailer-dashboard');
        return () => {
            const main = document.getElementsByTagName('main')[0];
            main?.classList?.remove?.('retailer-dashboard');
        };
    });

    return (<DashboardLayout/>);

    return (
        loginStatus?.isSuccess ? <DashboardLayout/> : <LoginWrapper uri={''}
            loginComponent={RetailerLogin}
            wrapperStyle={ { backgroundColor: '#231F20', height: '100vh'
                , display: 'flex', alignItems: 'center', justifyContent: 'center' } } />
    );

};

export default React.memo(Dashboard);
