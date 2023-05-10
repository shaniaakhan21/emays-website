import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import RetailerLogin from './Login';
import { loginExe } from '../redux/thunk/loginThunk';
import { useDispatch } from 'react-redux';

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

    const exeLogin = async ({
        username,
        password
    }) => {
        const data = { dispatch: dispatch, username: username, password: password };
        dispatch(loginExe(data));
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

export default LoginWrapper;
