import Checkbox from '@carbon/react/lib/components/Checkbox/Checkbox';

const CheckBoxCustom = ({
    labelText,
    id,
    action
}) => {
    return (
        <Checkbox onChange={() => { action(); }} labelText={labelText} id={id} />
    );
};

export default CheckBoxCustom;
