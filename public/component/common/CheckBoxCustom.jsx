import Checkbox from '@carbon/react/lib/components/Checkbox/Checkbox';

const CheckBoxCustom = ({
    labelText,
    id,
    action,
    ...props
}) => {
    return (
        <Checkbox {...props} onChange={() => { action(); }} labelText={labelText} id={id} />
    );
};

export default CheckBoxCustom;
