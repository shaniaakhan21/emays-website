import Checkbox from '@carbon/react/lib/components/Checkbox/Checkbox';
import PropTypes from 'prop-types';

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

CheckBoxCustom.propTypes = {
    labelText: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired
};

export default CheckBoxCustom;
