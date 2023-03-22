import PropTypes from 'prop-types';
import { TextInput } from '@carbon/react';

const TextBoxCustom = ({ labelText, helperText,
    placeholderText, warnText,
    size, invalidText, id, className, type, playgroundWidth, onChange, onClick, customStyle, invalid, ...props }) => {
    return (
        <TextInput
            className={className}
            helperText={helperText}
            id={id}
            invalidText={invalidText}
            labelText={labelText}
            onChange={onChange}
            onClick={onClick}
            placeholder={placeholderText}
            playgroundWidth={playgroundWidth}
            size={size}
            type={type}
            warnText={warnText}
            style={customStyle}
            invalid={invalidText || invalid ? true : false}
            {...props}
        />
    );
};

TextBoxCustom.propTypes = {
    labelText: PropTypes.string,
    helperText: PropTypes.string,
    placeholderText: PropTypes.string,
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

export default TextBoxCustom;
