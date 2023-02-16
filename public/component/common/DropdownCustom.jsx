import Dropdown from '@carbon/react/lib/components/Dropdown/Dropdown';

const DropDownCustom = ({ items }) => {
    return (
        <Dropdown
            id='default'
            label='Choose an option'
            items={items}
            itemToString={(item) => (item ? item.text : '')}
            style={{backGroundColor: 'white'}}
            onChange={() => {

            }} />
    );
};

export default DropDownCustom;
