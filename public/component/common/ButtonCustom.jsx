import Button from '@carbon/react/lib/components/Button/Button';

const ButtonCustom = ({ type, text, action, customStyle }) => {
    return (
        <Button style={customStyle} onClick={() => { action(); }} kind={type}>{text}</Button>
    );
};

export default ButtonCustom;
