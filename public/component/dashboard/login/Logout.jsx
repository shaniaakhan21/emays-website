import { useDispatch, useSelector } from 'react-redux';
import { loginSelectorMemoized } from '../redux/selector/loginSelector';
import { useCallback, useEffect } from 'react';
import { logoutExe } from '../redux/thunk/loginThunk';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export const LogoutFunc = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const loginStatusStore = useSelector(loginSelectorMemoized);

    const resetLoginStatus = useCallback(() => {
        return dispatch(logoutExe());
    }, [dispatch]); 

    useEffect(() => {
        if (loginStatusStore?.isSuccess) {
            (async () => {
                await resetLoginStatus();
                history.push('/dashboard');
            })();
        }
    }, []);
    
    return (
        <p>Logging out...</p>
    );
};
