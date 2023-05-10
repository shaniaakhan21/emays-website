import LoginWrapper from './LoginWrapper';
import { useSelector } from 'react-redux';
import RetailerLogin from './Login';
import { useEffect, useState } from 'react';
import { loginSelector } from './redux/selector/loginSelector';

export const Dashboard = () => {

    const [loginStatus, setLoginStatus] = useState(null);
    const loginStatusStore = useSelector(loginSelector);

    useEffect(() => {
        setLoginStatus(loginStatusStore);
    });

    return (
        loginStatus?.isSuccess ? <h1>Success</h1> : <LoginWrapper uri={''}
            loginComponent={RetailerLogin}
            wrapperStyle={ { backgroundColor: '#231F20', height: '100vh'
                , display: 'flex', alignItems: 'center', justifyContent: 'center' } } />
    );
    
};
