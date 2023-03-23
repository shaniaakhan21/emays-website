/* eslint-disable max-len */
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
    Grid,
    Column,
    Button
} from '@carbon/react';
import ButtonCustom from '../common/ButtonCustom';
import '../../scss/component/customer/homesection.scss';
import EMAYBAG from '../../images/HomeCustomerSection/DELIVERYBAGG.png';
import MailIcon from '../../images/HomeCustomerSection/email-icon.svg';
import { useTranslation } from 'react-i18next';

const HomeSection = () => {
    useEffect(() => {
        AOS.init();
    }, []);

    const [t] = useTranslation();
    return (
        <Grid className='shipping-section'>
            <Column lg={7} md={3} sm={4}>
                <div className='shipping-section__left'>
                    <h1 data-aos='fade-right' data-aos-easing='linear' data-aos-duration='1000' className='shipping-section__title alignment'>{t('home-section.col-1.title')}</h1>
                    <h2 data-aos='fade-right' data-aos-easing='linear' data-aos-duration='1000' data-aos-delay='500' className='shipping-section__subtitle alignment'>
                        {t('home-section.col-1.subtitle-h2')}
                    </h2>
                    <h3 data-aos='fade-right' data-aos-easing='linear' data-aos-duration='1000' data-aos-delay='800' className='shipping-section__description alignment'>
                        {t('home-section.col-1.subtitle-h3')}
                    </h3>
                    <Button data-aos='fade-in' data-aos-easing='linear' data-aos-duration='1000' data-aos-delay='1100' className='shipping-section__button alignment'>
                        {t('home-section.col-1.btn-text')}
                    </Button>
                </div>
            </Column>
            <Column lg={9} md={5} sm={4} className='shipping-column__below' >
                <img className='bag-img' src={EMAYBAG}/>
                <div className='buttons' >
                    <ButtonCustom action={() => {}} text={'Shop With Our Brands'} />
                    <ButtonCustom
                        action={() => {}}
                        iconDescription='E-Mail'
                        hasIconOnly
                        renderIcon={() => <img src={MailIcon} alt='E-Mail' />}
                    />
                </div>
                <Button className='shipping-section__button show'>
                    {t('home-section.col-1.btn-text')}
                </Button>
            </Column>
            <Column lg={9} md={5} sm={4} className='shipping-column__right' >
                <div className='shipping-section__right buttons' data-aos='fade-in' data-aos-easing='linear' data-aos-duration='1000' data-aos-delay='1100'>
                    {/* <ButtonCustom action={() => {}} text={'Shop With Our Brands'} />
                    <ButtonCustom
                        action={() => {}}
                        iconDescription='E-Mail'
                        hasIconOnly
                        renderIcon={() => <img src={MailIcon} alt='E-Mail' />} */}
                </div>
            </Column>
            
        </Grid>
    );
};

export default HomeSection;
