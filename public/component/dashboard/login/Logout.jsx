import { useDispatch, useSelector } from 'react-redux';
import { loginSelectorMemoized } from '../redux/selector/loginSelector';
import { useCallback, useEffect } from 'react';
import { logoutExe } from '../redux/thunk/loginThunk';
import { useNavigate } from 'react-router-dom';

export const LogoutFunc = () => {

    const dispatch = useDispatch();
    const history = useNavigate();
    const loginStatusStore = useSelector(loginSelectorMemoized);

    const resetLoginStatus = useCallback(() => {
        return dispatch(logoutExe());
    }, [dispatch]); 

    useEffect(() => {
        if (loginStatusStore?.isSuccess) {
            (async () => {
                await resetLoginStatus();
                history('/');
            })();
        }
    }, []);
    
    return (
        <p>Logging out...</p>
    );
};
