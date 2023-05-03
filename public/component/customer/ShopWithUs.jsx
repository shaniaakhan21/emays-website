import React, { useEffect, useMemo } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ShopTextBox from './shop-with-us/ShopTextBox';
import LocationICON from '../../images/HomeCustomerSection/location--heart.svg';
import ShopHeader from './shop-with-us/ShopHeader';
import Nav from '../common/Nav';
import LocationHeart from '../../images/location--heart.svg';
import EdtLoop from '../../images/edt-loop.svg';
import EventSchedule from '../../images/event--schedule.svg';
import Home from '../../images/home.svg';
import Time from '../../images/time.svg';
import HelpDesk from '../../images/help-desk.svg';
import Purchase from '../../images/purchase.svg';
import Sprout from '../../images/sprout.svg';
import SproutWhite from '../../images/plant-white.svg';
import Image5 from '../../images/5.png';
import Image6 from '../../images/6.png';
import Image31 from '../../images/3_1.png';
import Image32 from '../../images/3_2.png';
import Image33 from '../../images/3_3.png';
import Image51 from '../../images/5_1.png';
import Image61 from '../../images/6_1.png';
import '../../scss/component/customer/shopwithus.scss';
import { Column, Button, Grid } from '@carbon/react';
import { useTranslation } from 'react-i18next';
import ButtonCustom from '../common/ButtonCustom';

const icons = {
    1: LocationHeart,
    2: EdtLoop,
    3: EventSchedule
};

const ShopWithUs = () => {
    const [t] = useTranslation();

    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <>
            <div className='container-shop' style={{ background: '#ffffff' }} id='shop-with-us-start'>
                <div className='slanted_top'></div>
                <ShopHeader/>
                <Grid className='section-box item-set'>
                    <Column lg={8} md={4} sm={4} className='image-box'>
                        <img src={Image5} data-aos='fade-in' data-aos-easing='linear' data-aos-duration='800'/>
                        <img src={Image6} data-aos='fade-in' data-aos-easing='linear' data-aos-duration='800'/>
                    </Column>
                    <Column lg={8} md={4} sm={4}>
                        {[1, 2, 3].map(i => (<div className={`info-box info-box-${i}`}>
                            <h3 className='number' data-aos='fade-in' data-aos-easing='linear'
                                data-aos-duration='800'>{t(`shop-with-us.info-box.${i}.no`)}</h3>
                            <h1 className='title' data-aos='fade-in' data-aos-easing='linear'
                                data-aos-duration='800'>{t(`shop-with-us.info-box.${i}.title`)}</h1>
                            <div className='icon' data-aos='fade-in' data-aos-easing='linear' data-aos-duration='800'>
                                <img src={icons[i]}/>
                                <h4 className='title'>{t(`shop-with-us.info-box.${i}.icon-text`)}</h4>
                            </div>
                            <p className='description' data-aos='fade-in' data-aos-easing='linear'
                                data-aos-duration='800'>{t(`shop-with-us.info-box.${i}.description`)}</p>
                        </div>))}
                    </Column>
                </Grid>
            </div>
            <div className='container-shop item-set' style={{ background: '#231f20' }}>
                <div className='slanted_top black'></div>
                <Grid className='section-box item-set black reverse'>
                    <Column lg={8} md={4} sm={4} className='center-text'>
                        <div className='info-box'>
                            <h3 className='number' data-aos='fade-in' data-aos-easing='linear'
                                data-aos-duration='800'>{t('shop-with-us.info-box.4.no')}</h3>
                            <h1 className='title' data-aos='fade-in' data-aos-easing='linear'
                                data-aos-duration='800'>{t('shop-with-us.info-box.4.title')}</h1>
                            <div className='icon' data-aos='fade-in' data-aos-easing='linear' data-aos-duration='800'>
                                <img src={Home}/>
                                <h4 className='title'>{t('shop-with-us.info-box.4.icon-text')}</h4>
                            </div>
                            <p className='description' data-aos='fade-in' data-aos-easing='linear'
                                data-aos-duration='800'>{t('shop-with-us.info-box.4.description')}</p>
                        </div>
                    </Column>
                    <Column lg={8} md={4} sm={4} className='image-box solo'>
                        <img src={Image31}/>
                    </Column>
                </Grid>
                <Grid className='section-box item-set black'>
                    <Column lg={8} md={4} sm={4} className='image-box solo'>
                        <img src={Image32} data-aos='fade-in' data-aos-easing='linear' data-aos-duration='800'/>
                    </Column>
                    <Column lg={8} md={4} sm={4} className='center-text'>
                        <div className='info-box'>
                            <div className='icon' data-aos='fade-in' data-aos-easing='linear' data-aos-duration='800'>
                                <img src={Time}/>
                                <h4 className='title'>{t('shop-with-us.info-box.4_1.icon-text')}</h4>
                            </div>
                            <p className='description' data-aos='fade-in' data-aos-easing='linear'
                                data-aos-duration='800'>{t('shop-with-us.info-box.4_1.description')}</p>
                        </div>
                    </Column>
                </Grid>
                <Grid className='section-box item-set black reverse'>
                    <Column lg={8} md={4} sm={4} className='center-text'>
                        <div className='info-box'>
                            <div className='icon' data-aos='fade-in' data-aos-easing='linear' data-aos-duration='800'>
                                <img src={HelpDesk}/>
                                <h4 className='title'>{t('shop-with-us.info-box.4_2.icon-text')}</h4>
                            </div>
                            <p className='description' data-aos='fade-in' data-aos-easing='linear'
                                data-aos-duration='800'>{t('shop-with-us.info-box.4_2.description')}</p>
                        </div>
                    </Column>
                    <Column lg={8} md={4} sm={4} className='image-box solo'>
                        <img src={Image33}/>
                    </Column>
                </Grid>
            </ div>
            <div className='container-shop last' style={{ background: '#ffffff' }}>
                <div className='slanted_top'></div>
                <Grid className='section-box first'>
                    <Column lg={8} md={4} sm={4} className='image-box solo'>
                        <img src={Image51}/>
                    </Column>
                    <Column lg={8} md={4} sm={4} className='center-text'>
                        <div className='info-box'>
                            <h3 className='number' data-aos='fade-in' data-aos-easing='linear'
                                data-aos-duration='800'>{t('shop-with-us.info-box.5.no')}</h3>
                            <h1 className='title' data-aos='fade-in' data-aos-easing='linear'
                                data-aos-duration='800'>{t('shop-with-us.info-box.5.title')}</h1>
                            <div className='icon' data-aos='fade-in' data-aos-easing='linear' data-aos-duration='800'>
                                <img src={Purchase}/>
                                <h4 className='title'>{t('shop-with-us.info-box.5.icon-text')}</h4>
                            </div>
                            <p className='description' data-aos='fade-in' data-aos-easing='linear'
                                data-aos-duration='800'>{t('shop-with-us.info-box.5.description')}</p>
                        </div>
                    </Column>
                </Grid>
                <Grid className='section-box co2'>
                    <Column lg={8} md={4} sm={4} className='center-text'>
                        <div className='info-box'>
                            <h3 className='number' data-aos='fade-in' data-aos-easing='linear'
                                data-aos-duration='800'>{t('shop-with-us.info-box.6.no')}</h3>
                            <h1 className='title' data-aos='fade-in' data-aos-easing='linear'
                                data-aos-duration='800'>{t('shop-with-us.info-box.6.title')}</h1>
                            <div className='icon' data-aos='fade-in' data-aos-easing='linear' data-aos-duration='800'>
                                <img src={Sprout} data-aos='fade-in' data-aos-easing='linear' data-aos-duration='800'/>
                                <h4 className='title'>{t('shop-with-us.info-box.6.icon-text')}</h4>
                            </div>
                            <p className='description' data-aos='fade-in' data-aos-easing='linear'
                                data-aos-duration='800'>{t('shop-with-us.info-box.6.description')}</p>
                            <a href='https://onetreeplanted.org/'>
                                <ButtonCustom action={() => {}} text={'Read More About this'} />
                            </a>
                        </div>
                    </Column>
                    <Column lg={8} md={4} sm={4} className='image-box solo'>
                        <img src={Image61} data-aos='fade-in' data-aos-easing='linear' data-aos-duration='800'/>
                        <div className='icon xs' data-aos='fade-in' data-aos-easing='linear' data-aos-duration='800'>
                            <img src={SproutWhite} data-aos='fade-in' data-aos-easing='linear'
                                data-aos-duration='800'/>
                            <h4 className='title'>{t('shop-with-us.info-box.6.icon-text-short')}</h4>
                        </div>
                    </Column>
                </Grid>
            </ div>
        </>
    );
};

export default ShopWithUs;
