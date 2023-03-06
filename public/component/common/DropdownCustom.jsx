import Dropdown from '@carbon/react/lib/components/Dropdown/Dropdown';

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

export default DropDownCustom;
