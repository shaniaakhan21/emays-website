import ContentSwitcher from '@carbon/react/lib/components/ContentSwitcher';
import Switch from '@carbon/react/lib/components/Switch/Switch';
import PropTypes from 'prop-types';

const ContentSwitcherCustom = ({ nextDateOne, nextDateTwo, nextDateThree }) => {
    return (
        <ContentSwitcher selectedIndex={2} onChange={(event) => {
        }}>
            <Switch disabled name='one' text={nextDateOne} />
            <Switch disabled name='two' text={nextDateTwo} />
            <Switch disabled name='three' text={nextDateThree} />
        </ContentSwitcher>
    );
};

ContentSwitcherCustom.propTypes = {
    nextDateOne: PropTypes.string.isRequired,
    nextDateTwo: PropTypes.string.isRequired,
    nextDateThree: PropTypes.string.isRequired
};

export default ContentSwitcherCustom;
