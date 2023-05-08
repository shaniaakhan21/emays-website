import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import RetailerLogin from './Login';
import { loginSuperUser } from '../../services/login';
import { login } from './redux/slice/loginSlice';
import { useDispatch } from 'react-redux';

const LoginWrapperLayout = styled.div`
    ${(props) => props.styles && css`
        ${(props) => props.styles}
    `}
`;

LoginWrapperLayout.propTypes = {
    styles: PropTypes.object
};

const exeLogin = async ({
    username,
    password
}) => {
    const dispatch = useDispatch();
    const data = await loginSuperUser({ username: username, password: password });
    if (data) {
        dispatch(login('token'));
    }
};

const LoginWrapper = ({ loginComponent: LoginComponent, uri, wrapperStyle }) => {
    
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
