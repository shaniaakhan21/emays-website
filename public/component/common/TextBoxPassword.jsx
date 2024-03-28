import PropTypes from 'prop-types';
import { TextInput } from '@carbon/react';

const TextBoxPassword = ({ labelText, helperText,
    placeholderText, warnText, size, invalidText, id, showPasswordLabel,
    className, type, playgroundWidth, hidePasswordLabel, onChange, onClick, customStyle, invalid, ...props }) => {
    return (
        <TextInput.PasswordInput
            className={className}
            helperText={helperText}
            id={id}
            autoComplete='off'
            invalidText={invalidText}
            showPasswordLabel={showPasswordLabel}
            labelText={labelText}
            onChange={onChange}
            onClick={onClick}
            placeholder={placeholderText}
            playgroundWidth={playgroundWidth}
            size={size}
            type={type}
            warnText={warnText}
            style={customStyle}
            hidePasswordLabel={hidePasswordLabel}
            invalid={invalidText || invalid ? true : false}
            {...props}
        />
    );
};

TextBoxPassword.propTypes = {
    labelText: PropTypes.string,
    helperText: PropTypes.string,
    hidePasswordLabel: PropTypes.string,
    placeholderText: PropTypes.string,
    showPasswordLabel: PropTypes.string,
    warnText: PropTypes.string,
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    invalidText: PropTypes.string,
    id: PropTypes.string,
    className: PropTypes.string,
    type: PropTypes.string,
    playgroundWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
    onClick: PropTypes.func,
    customStyle: PropTypes.object
};

export default TextBoxPassword;
