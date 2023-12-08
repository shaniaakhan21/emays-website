import React, { useCallback, useEffect } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import RetailerLogin from './Login';
import { loginExe } from '../redux/thunk/loginThunk';
import { useDispatch } from 'react-redux';
import { useMessage } from '../../common/messageCtx';
import { useTranslation } from 'react-i18next';
import { getAuthToken } from '../../../js/util/SessionStorageUtil';

const LoginWrapperLayout = styled.div`
    ${(props) => props.styles && css`
        ${(props) => props.styles}
    `}
`;

LoginWrapperLayout.propTypes = {
    styles: PropTypes.object
};

const LoginWrapper = ({ loginComponent: LoginComponent, uri, wrapperStyle }) => {

    const dispatch = useDispatch();
    const pushAlert = useMessage();
    const [t] = useTranslation();

    const login = useCallback((username, password) => { 
        const data = { dispatch: dispatch, username: username, password: password };
        return dispatch(loginExe(data));
    }, [dispatch]);

    const exeLogin = async ({
        username,
        password
    }) => {
        const result = await login(username, password);
        if (result?.error?.message) {
            pushAlert({
                kind: 'error',
                title: t('statusMessage.error'),
                subtitle: result?.error?.message
            });
        }

    };
    
    return (
        <LoginWrapperLayout styles={wrapperStyle}>
            <LoginComponent exeLogin = {exeLogin}/>
        </LoginWrapperLayout>
    );

};

LoginWrapper.propTypes = {
    loginComponent: PropTypes.oneOfType([
        // Here mention other Login Components that you need
        PropTypes.elementType = RetailerLogin
    ]),
    uri: PropTypes.string,
    wrapperStyle: PropTypes.object
};

export default React.memo(LoginWrapper);
