import ContentSwitcher from '@carbon/react/lib/components/ContentSwitcher';
import Switch from '@carbon/react/lib/components/Switch/Switch';

const ContentSwitcherCustom = ({ nextDateOne, nextDateTwo, nextDateThree }) => {
    return (
        <ContentSwitcher selectedIndex={2} onChange={(event) => {
            console.log(event.target);
        }}>
            <Switch name='one' text={nextDateOne} />
            <Switch name='two' text={nextDateTwo} />
            <Switch name='three' text={nextDateThree} />
        </ContentSwitcher>
    );
};

export default ContentSwitcherCustom;
