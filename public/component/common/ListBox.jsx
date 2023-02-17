import ListItem from '@carbon/react/lib/components/ListItem/ListItem';
import UnorderedList from '@carbon/react/lib/components/UnorderedList/UnorderedList';

const ListBox = ({ items, style }) => {
    return (
        <UnorderedList>
            {
                items && items.map((item) => <ListItem style={style}>{item}</ListItem>)
            }
        </UnorderedList>
    );
};

export default ListBox;
