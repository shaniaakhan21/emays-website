/* eslint-disable max-len */
import React from 'react';
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
    const [t] = useTranslation();
    return (
        <Grid className='shipping-section'>
            <Column lg={7} md={3} sm={4}>
                <div className='shipping-section__left'>
                    <h1 className='shipping-section__title alignment'>{t('home-section.col-1.title')}</h1>
                    <h2 className='shipping-section__subtitle alignment'>
                        {t('home-section.col-1.subtitle-h2')}
                    </h2>
                    <h3 className='shipping-section__description alignment'>
                        {t('home-section.col-1.subtitle-h3')}
                    </h3>
                    <Button className='shipping-section__button alignment'>
                        {t('home-section.col-1.btn-text')}
                    </Button>
                </div>
            </Column>
            <Column lg={9} md={5} sm={4} className='shipping-column__below' >
                <img className='bag-img' src={EMAYBAG}/>
                <div className='buttons'>
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
                <div className='shipping-section__right buttons'>
                    <ButtonCustom action={() => {}} text={'Shop With Our Brands'} />
                    <ButtonCustom
                        action={() => {}}
                        iconDescription='E-Mail'
                        hasIconOnly
                        renderIcon={() => <img src={MailIcon} alt='E-Mail' />}
                    />
                </div>
            </Column>
            
        </Grid>
    );
};

export default HomeSection;
