import ListItem from '@carbon/react/lib/components/ListItem/ListItem';
import UnorderedList from '@carbon/react/lib/components/UnorderedList/UnorderedList';
import PropTypes from 'prop-types';

const ListBoxCustom = ({ items, style }) => {
    return (
        <UnorderedList>
            {
                items && items.map((item) => <ListItem style={style}>{item}</ListItem>)
            }
        </UnorderedList>
    );
};

ListBoxCustom.propTypes = {
    items: PropTypes.arrayOf(PropTypes.string).isRequired,
    style: PropTypes.object
};

export default ListBoxCustom;
