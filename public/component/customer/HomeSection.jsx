/* eslint-disable max-len */
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
    Grid,
    Column,
    Button
} from '@carbon/react';
import '../../scss/component/customer/homesection.scss';
import EMAYBAG from '../../images/HomeCustomerSection/DELIVERYBAGG.png';
import { useTranslation } from 'react-i18next';

import Home1 from '../../images/customer_home_1.png';
import Home2 from '../../images/customer_home_2.png';
import MailIcon from '../../images/mail-black.svg';

const HomeSection = () => {
    useEffect(() => {
        AOS.init();
    }, []);

    const [t] = useTranslation();

    return (
        <Grid className='shipping-section'>
            <Column lg={7} md={4} sm={4}>
                <div className='shipping-section__left'>
                    <h1 data-aos='fade-right' data-aos-easing='linear' data-aos-duration='1000' className='shipping-section__title alignment'>{t('home-section.col-1.title')}</h1>
                    <h1 data-aos='fade-right' data-aos-easing='linear' data-aos-duration='1000' className='shipping-section__title_2 alignment'>{t('home-section.col-1.title-2')}</h1>
                    <h2 data-aos='fade-right' data-aos-easing='linear' data-aos-duration='1000' data-aos-delay='500' className='shipping-section__subtitle alignment'>
                        {t('home-section.col-1.subtitle-h2')}
                    </h2>
                    <h3 data-aos='fade-right' data-aos-easing='linear' data-aos-duration='1000' data-aos-delay='800' className='shipping-section__description alignment'>
                        {t('home-section.col-1.subtitle-h3')}
                    </h3>
                    <div className='shipping-section__button_parent'>
                        <Button data-aos='fade-in' data-aos-easing='linear' data-aos-duration='1000' data-aos-delay='1100' className='shipping-section__button alignment'>
                            {t('home-section.col-1.btn-text')}
                        </Button>
                        <Button renderIcon={() => <img src={MailIcon} />} data-aos='fade-in' data-aos-easing='linear' data-aos-duration='1000' data-aos-delay='1100' className='shipping-section__button btn2 alignment'>
                            <p>E-Mail us</p>
                        </Button>
                    </div>
                </div>
            </Column>
            {/* <Column lg={9} md={5} sm={4} className='shipping-column__below'> */}
            {/*     <img className='bag-img' src={EMAYBAG}/> */}
            {/*     <Button className='shipping-section__button show'> */}
            {/*         {t('home-section.col-1.btn-text')} */}
            {/*     </Button> */}
            {/* </Column> */}
            <Column lg={9} md={4} sm={4} className='shipping-column__right' >
                <img src={Home2} className='shipping-section__right-img1' />
                <img src={Home1} className='shipping-section__right-img2' />
            </Column>
            <Column lg={16} md={8} sm={4} className='shipping-section__button_parent mobile' >
                <Button className='shipping-section__button alignment'>
                    {t('home-section.col-1.btn-text')}
                </Button>
                <Button renderIcon={() => <img src={MailIcon} />} className='shipping-section__button btn2 alignment'>
                    <p>E-Mail us</p>
                </Button>
            </Column>
        </Grid>
    );
};

export default HomeSection;
