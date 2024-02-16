/* eslint-disable max-len */
import Nav from '../common/Nav';
import HomeSection from './HomeSection';
import ShopWithUs from './ShopWithUs';
import Footer from '../common/Footer';
import { useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const CustomerHome = ({
    withoutNav,
    ...props
}) => {

    const [t] = useTranslation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const isShopWithUs = localStorage.getItem('shopWithUs');
        if (isShopWithUs === 'true') {
            localStorage.setItem('shopWithUs', false);
            const elem = document.querySelector( '#shop-with-us-start' );
            elem?.scrollIntoView?.({ behavior: 'smooth' });
        }
    }, [localStorage]);

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <meta name='description' content={t('heads.customers.home.description')}/>
                    <title>{t('heads.customers.home.title')}</title>
                    <link rel='canonical' href='/' />
                </Helmet>
                {!withoutNav && <Nav refs={props.refs} />}
                <HomeSection />
                <ShopWithUs />
                <Footer />
            </HelmetProvider>
        </>
    );
};

export default CustomerHome;
