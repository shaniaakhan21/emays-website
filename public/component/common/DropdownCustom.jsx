import Dropdown from '@carbon/react/lib/components/Dropdown/Dropdown';
import PropTypes from 'prop-types';

const DropDownCustom = ({ items, customStyle }) => {
    return (
        <Dropdown
            id='default'
            label='Choose an option'
            items={items}
            style={customStyle}
            itemToString={(item) => (item ? item.text : '')}
            onChange={() => {

            }} />
    );
};

DropDownCustom.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired
        })
    ).isRequired,
    customStyle: PropTypes.object
};

export default DropDownCustom;
