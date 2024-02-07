import Button from '@carbon/react/lib/components/Button/Button';
import { Button as Button2 } from '@carbon/react';
import PropTypes from 'prop-types';

const ButtonCustom = ({ type, text, action, customStyle, ...props }) => {
    return (
        <Button {...props} style={customStyle} onClick={() => { action(); }} kind={type}>{text}</Button>
    );
};

export default ButtonCustom;
