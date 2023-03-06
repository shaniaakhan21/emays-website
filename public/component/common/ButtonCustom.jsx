import Button from '@carbon/react/lib/components/Button/Button';

const ButtonCustom = ({ type, text, action, customStyle, ...props }) => {
    return (
        <Button {...props} style={customStyle} onClick={() => { action(); }} kind={type}>{text}</Button>
    );
};

export default ButtonCustom;
