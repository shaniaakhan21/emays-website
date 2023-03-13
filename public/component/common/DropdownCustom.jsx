import PropTypes from 'prop-types';
import { Dropdown } from '@carbon/react';

const DropDownCustom = ({ items, customStyle, ...props }) => {
    return (
        <Dropdown
            {...props}
            id='default'
            label='Choose an option'
            items={items}
            style={customStyle}
            itemToString={(item) => (item ? item.text : '')}
        />
    );
};

DropDownCustom.propTypes = {
    ...Dropdown.propTypes,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired
        })
    ).isRequired,
    customStyle: PropTypes.object
};

export default DropDownCustom;
