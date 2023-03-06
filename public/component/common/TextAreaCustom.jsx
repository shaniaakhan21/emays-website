import { TextArea } from '@carbon/react';

const TextAreaCustom = (props) => {
    return (
        <TextArea
            {...props}
        />
    );
};

TextAreaCustom.propTypes = TextArea.propTypes;

export default TextAreaCustom;
