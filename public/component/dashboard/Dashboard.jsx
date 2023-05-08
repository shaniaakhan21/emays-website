import LoginWrapper from './LoginWrapper';
import { login } from './redux/slice/loginSlice';
import { useDispatch, useSelector } from 'react-redux';
import RetailerLogin from './Login';
import { useReducer, useState } from 'react';

export const Dashboard = () => {

    const [loginStatus, setLoginStatus] = useState(null);

    useReducer(() => {
        const loginStatus = useSelector((state) => state.loginStatus);
        setLoginStatus(loginStatus);
    });

    return (
        loginStatus ? <h1>Success</h1> : <LoginWrapper uri={''}
            loginComponent={RetailerLogin}
            wrapperStyle={ { backgroundColor: '#231F20', height: '100vh'
                , display: 'flex', alignItems: 'center', justifyContent: 'center' } } />
    );
    
};
