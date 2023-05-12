import Nav from '../common/Nav';
import HomeSection from './HomeSection';
import ShopWithUs from './ShopWithUs';
import Footer from '../common/Footer';
import { useEffect } from 'react';

const CustomerHome = ({
    withoutNav,
    ...props
}) => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            {!withoutNav && <Nav refs={props.refs} />}
            <HomeSection />
            <ShopWithUs />
            <Footer />
        </>
    );
};

export default CustomerHome;
