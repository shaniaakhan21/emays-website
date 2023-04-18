import Nav from '../common/Nav';
import HomeSection from './HomeSection';
import ShopWithUs from './ShopWithUs';
import Environment from './Environment';
import Services from './Services';
import RetailerLetsTalk from '../retailer/LetsTalk';
import RetailerFAQs from '../retailer/FAQs';

const CustomerHome = ({
    withoutNav,
    ...props
}) => {
    return (
        <>
            {!withoutNav && <Nav refs={props.refs} />}
            <HomeSection />
            <ShopWithUs />
            <Environment />
            <Services />
            <RetailerLetsTalk />
            <RetailerFAQs />
        </>
    );
};

export default CustomerHome;
