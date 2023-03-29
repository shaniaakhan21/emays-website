import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ShopTextBox from './shop-with-us/ShopTextBox';
import LocationICON from '../../images/HomeCustomerSection/location--heart.svg';
import ShopHeader from './shop-with-us/ShopHeader';
import Nav from '../common/Nav';
import STOREATHOME from '../../images/HomeCustomerSection/store-at-home.svg';
import STOREATHOMEXS from '../../images/HomeCustomerSection/store-at-home-xs.png';
import SAVETHETIME from '../../images/HomeCustomerSection/edt-loop.svg';
import SAVETIMEIMG from '../../images/HomeCustomerSection/SAVETIME-IMG.svg';
import SAVETIMEIMGXS from '../../images/HomeCustomerSection/save-time-xs.png';
import EVENTICON from '../../images/HomeCustomerSection/event--schedule.svg';
import SCHEDULEIMG from '../../images/HomeCustomerSection/SCHEDULE-IMG.svg';
import SCHEDULEIMGXS from '../../images/HomeCustomerSection/schedule-xs.png';
import CO2Neutral from '../../images/HomeCustomerSection/co2-neutral.svg';
import CLIMATE from '../../images/HomeCustomerSection/Frame-90.svg';
import CLIMATEXS from '../../images/HomeCustomerSection/climate-xs.png';
import ButtonCustom from '../../component/common/ButtonCustom';
import MailIcon from '../../images/HomeCustomerSection/email-icon.svg';
import '../../scss/component/customer/shopwithus.scss';
import { Column, Button, Grid } from '@carbon/react';
import { useTranslation } from 'react-i18next';

const ShopWithUs = () => {
    const [t] = useTranslation();

    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <div className='container-shop' style={{ background: '#231F20' }} id='shop-with-us-start'>  
            <ShopHeader />
            <ShopTextBox
                headingText={t('shop-with-us.first-block.head-text')}
                icon={LocationICON}
                subheadingText={t('shop-with-us.first-block.subhead-text')}
                bodyText={t('shop-with-us.first-block.body-text')}
                customStyle={['position-md']}
            />
            <img data-aos='zoom-in' data-aos-easing='linear' 
                data-aos-duration='1000' data-aos-delay='600' className='store-at-home' src={STOREATHOME} />
            <img data-aos='zoom-in' data-aos-easing='linear' 
                data-aos-duration='1000' data-aos-delay='600' className='store-at-home-xs' src={STOREATHOMEXS} />
            <ShopTextBox
                headingText={t('shop-with-us.second-block.head-text')}
                icon={SAVETHETIME}
                subheadingText={t('shop-with-us.second-block.subhead-text')}
                bodyText={t('shop-with-us.second-block.body-text')}
                customStyle={['position']}
            />
            <img data-aos='zoom-in' data-aos-easing='linear' 
                data-aos-duration='1000' data-aos-delay='600' className='save-time' src={SAVETIMEIMG} />  
            <img data-aos='zoom-in' data-aos-easing='linear' 
                data-aos-duration='1000' data-aos-delay='600' className='save-time-xs' src={SAVETIMEIMGXS} />
            <ShopTextBox
                headingText={t('shop-with-us.third-block.head-text')}
                icon={EVENTICON}
                subheadingText={t('shop-with-us.third-block.subhead-text')}
                bodyText={t('shop-with-us.third-block.body-text')}
                customStyle={['position-event']}
            />
            <img data-aos='zoom-in' data-aos-easing='linear' 
                data-aos-duration='1000' data-aos-delay='600' className='schedule-event' src={SCHEDULEIMG} />
            <img data-aos='zoom-in' data-aos-easing='linear' 
                data-aos-duration='1000' data-aos-delay='600' className='schedule-event-xs' src={SCHEDULEIMGXS} />
            <ShopTextBox
                headingText={t('shop-with-us.fourth-block.head-text')}
                icon={CO2Neutral}
                subheadingText={t('shop-with-us.fourth-block.subhead-text')}
                bodyText={t('shop-with-us.fourth-block.body-text')}
                customStyle={['position-climate']}
            />
            <Grid className='grid-box'>
                <Column lg={10} md={4} sm={4} xs={4} className='img-climate'>
                    <img data-aos='zoom-in' data-aos-easing='linear' 
                        data-aos-duration='1000' data-aos-delay='600' className='climate' src={CLIMATE} />
                    <img data-aos='zoom-in' data-aos-easing='linear' 
                        data-aos-duration='1000' data-aos-delay='600' className='climate-xs' src={CLIMATEXS} />
                </Column>
                <Column data-aos='fade-in' data-aos-easing='linear' 
                    data-aos-duration='1000' lg={6} md={4} sm={4} xs={4} className='read-more'>
                    <Button className='shipping-section__button'>
                        {t('shop-with-us.fifth-block.btn-text')}
                    </Button>
                </Column>
            </Grid>  
            <div data-aos='fade-in' data-aos-easing='linear' 
                data-aos-duration='1000' className='shipping-section__right buttons'>
                <ButtonCustom action={() => {}} text= {t('shop-with-us.fifth-block.email-text')} />
                <ButtonCustom
                    action={() => {}}
                    iconDescription='E-Mail'
                    hasIconOnly
                    renderIcon={() => <img src={MailIcon} alt='E-Mail' />}
                />
            </div>
        </ div>
    );
};

export default ShopWithUs;
