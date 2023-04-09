import Nav from '../common/Nav';
import HomeSection from './HomeSection';
import ShopWithUs from './ShopWithUs';
import Environment from './Environment';
import Services from './Services';
import RetailerLetsTalk from '../retailer/LetsTalk';
import RetailerFAQs from '../retailer/FAQs';
import ErrorBoundary from '../ErrorBoundary';

const CustomerHome = ({
    withoutNav,
    ...props
}) => {
    return (
        <ErrorBoundary>
            {!withoutNav && <Nav refs={props.refs} />}
            <HomeSection />
            <ShopWithUs />
            <Environment />
            <Services />
            <RetailerLetsTalk />
            <RetailerFAQs />
        </ErrorBoundary>
    );
};

export default CustomerHome;
