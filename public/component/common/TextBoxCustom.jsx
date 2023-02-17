import TextInput from '@carbon/react/lib/components/TextInput';

const TextBoxCustom = ({ labelText, helperText,
    placeholderText, warnText,
    size, invalidText, id, className, type, playgroundWidth, onChange, onClick }) => {
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
        />
    );
};

export default TextBoxCustom;
