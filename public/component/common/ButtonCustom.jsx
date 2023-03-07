import Button from '@carbon/react/lib/components/Button/Button';
import PropTypes from 'prop-types';

const ButtonCustom = ({ type, text, action, customStyle, ...props }) => {
    return (
        <Button {...props} style={customStyle} onClick={() => { action(); }} kind={type}>{text}</Button>
    );
};

ButtonCustom.propTypes = {
    type: PropTypes.oneOf(['primary', 'secondary', 'danger', 'ghost', 'tertiary']),
    text: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired,
    customStyle: PropTypes.object
};

export default ButtonCustom;
