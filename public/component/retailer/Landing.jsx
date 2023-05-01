import { Column as Col, Column, Grid } from '@carbon/react';
import { useTranslation } from 'react-i18next';

// Components
import RetailerLayout from '../common/RetailerLayout';
import ButtonCustom from '../common/ButtonCustom';
import Footer from '../common/Footer';

// SCSS
import './../../scss/component/retailer/landing.page.scss';

// Images
import AnimationGraphic from './../../images/animation.png';
import MailIcon from '../../images/HomeCustomerSection/email-icon.svg';
import RetailerGraphic1 from '../../images/retailer-graphic-1.svg';
import RetailerGraphic2 from '../../images/retailer-graphic-2.svg';
import RetailerGraphic3 from '../../images/retailer-graphic-3.svg';
import Chart from '../common/Chart';
import React, { useEffect, useRef } from 'react';
import IntegrationVideo from '../../videos/emays_animation_1.mp4';
import IntegrationVideo2 from '../../videos/emays_animation_2.mp4';
import IntegrationVideo3 from '../../videos/emays_animation_3.mp4';
import CountUp from 'react-countup';

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const RetailerLanding = () => {
    const animationRef = useRef(null);
    const timerRef = useRef(null);
    const [translate] = useTranslation();

    const t = (key) => translate(`retailer.landing.${key}`);

    const switchSlide = async () => {
        const found = /\s?f-(\d+)\s?/.exec(animationRef.current.className);
        const cur = parseInt(found[1]);
        let next = cur + 1;
        if (cur === 12) {
            next = 1;
        }
        animationRef.current.classList.remove(`f-${cur}`);
        animationRef.current.classList.add(`f-${next}`);

        animationRef.current.classList.add('show');
        // Wait to show
        await wait(400);
        // Wait to visible
        await wait(500);
        // Check if need scrolling
        if ([6].indexOf(next) > -1) {
            animationRef.current.classList.add('scroll');
            // Wait to scroll
            await wait(800);
            // Wait to view
            await wait(400);
        }
        // Hide
        animationRef.current.classList.remove('show');
        // Wait to hide
        await wait(400);

        switchSlide();
    };

    useEffect(() => {
        switchSlide();
    }, []);

    return (
        <>
            <RetailerLayout className='landing'>
                <Column lg={16} md={8} sm={4} xs={4} className='heading-p1'>
                    <div src={AnimationGraphic} className='animation-graphic-1 f-1' ref={r => {
                        animationRef.current = r;
                    }}/>
                    <Grid>
                        <Column id='landing-start' lg={16} md={8} sm={4} xs={4} className='title'>
                            {t('title')}
                        </Column>
                        <Column lg={16} md={8} sm={4} xs={4} className='sub-title'>
                            {t('sub-header')}
                        </Column>
                        <Column lg={16} md={8} sm={4} xs={4} className='description'>
                            {t('description')}
                        </Column>
                        <Column lg={16} md={8} sm={4} xs={4} className='see-more'>
                            <div className='shipping-section__right buttons'>
                                <a href='/#/integration'>
                                    <ButtonCustom action={() => {
                                    }} text={t('button')}/>
                                </a>
                                <a href='/#/letsTalk'>
                                    <ButtonCustom
                                        action={() => {
                                        }}
                                        iconDescription='E-Mail'
                                        hasIconOnly
                                        renderIcon={() => <img src={MailIcon} alt='E-Mail'/>}
                                    />
                                </a>
                            </div>
                        </Column>
                    </Grid>
                </Column>
                <Column lg={16} md={8} sm={4} xs={4} className='benefits'>
                    <div className='slanted_top'></div>
                    <div className='white_box'>
                        <h1 className='title'>Benefits</h1>
                        <Grid>
                            <Column lg={8} md={4} sm={4} xs={4} className='left'>
                                <div className='info-box'>
                                    <h2>Maximise and increase sales</h2>
                                    <p>Personalised luxury experience for customers,
                                        assisted at every touch point of the shopping process
                                        by expert advisors at their own comfort</p>
                                </div>
                                <div className='info-box'>
                                    <h2>Full inventory control</h2>
                                    <p>If unsold, the product will return and be
                                        available in your store within 24 hours</p>
                                </div>
                                <div className='info-box'>
                                    <h2>Converting new clients</h2>
                                    <p>Our services aims to make shopping easier towards brands for new customers
                                        to engage and overcome barriers such as:</p>
                                    <ul>
                                        <li>Size issue</li>
                                        <li>Pending refunds</li>
                                        <li>Wrong fit</li>
                                        <li>Hassle of returns</li>
                                    </ul>
                                </div>
                            </Column>
                            <Column lg={8} md={4} sm={4} xs={4} className='right'>
                                <div>
                                    <video style={{ filter: 'invert(1)' }} width='300' height='300' loop autoPlay muted>
                                        <source src={IntegrationVideo} type='video/mp4'/>
                                    </video>
                                </div>
                            </Column>
                        </Grid>
                    </div>
                </Column>
                <Column lg={16} md={8} sm={4} xs={4} className='integration2'>
                    <div className='slanted_top black'></div>
                    <div className='black_box'>
                        <h1 className='title'>Seamless integration</h1>
                        <Grid>
                            <Column lg={8} md={4} sm={4} xs={4} className='right xs-hidden'>
                                <video style={{ filter: 'saturate(3.5) hue-rotate(410deg) contrast(75%)' }} width='300'
                                    height='300' loop autoPlay muted>
                                    <source src={IntegrationVideo2} type='video/mp4'/>
                                </video>
                                <video style={{
                                    filter: 'saturate(3.5) hue-rotate(410deg) contrast(75%)',
                                    objectFit: 'cover'
                                }} width='300'
                                height='120' loop autoPlay muted>
                                    <source src={IntegrationVideo3} type='video/mp4'/>
                                </video>
                            </Column>
                            <Column lg={8} md={4} sm={4} xs={4} className='left'>
                                <div className='info-box'>
                                    <h2>E-commerce</h2>
                                    <p>Emays connects with all primary E-commerce platforms and a simple API for
                                        anything more customized. Emays appears as a new delivery method, the client
                                        will have the option to pick their delivery date, time, and Emays services at
                                        the check out</p>
                                </div>
                                <div className='info-image xs-only'>
                                    <video style={{ filter: 'saturate(3.5) hue-rotate(410deg) contrast(75%)' }}
                                        width='300' height='300' loop autoPlay muted>
                                        <source src={IntegrationVideo2} type='video/mp4'/>
                                    </video>
                                </div>
                                <div className='info-box'>
                                    <h2>In- Store</h2>
                                    <p>An easy to use web interface to book Emays deliveries and services that can
                                        be installed using in store devices such as phones and computers</p>
                                </div>
                                <div className='info-box'>
                                    <h2>RETAIL EXCELLENCE</h2>
                                    <p>At Emays we believe that the customer experience always comes first.
                                        Our integration has been built to give the feeling of your brand and
                                        experience, just powered by Emays. Our aim is to create a pleasurable
                                        customer experience easy to use</p>
                                </div>
                                <div className='info-image xs-only'>
                                    <video style={{
                                        filter: 'saturate(3.5) hue-rotate(410deg) contrast(75%)',
                                        objectFit: 'cover'
                                    }}
                                    width='300' height='120' loop autoPlay muted>
                                        <source src={IntegrationVideo2} type='video/mp4'/>
                                    </video>
                                </div>
                            </Column>
                        </Grid>
                    </div>
                </Column>
                <Column lg={16} md={8} sm={4} xs={4} className='chart'>
                    <div className='slanted_top'></div>
                    <div className='white_box'>
                        <h1 className='title'>FROM PROVEN DATA STUDIES</h1>
                        <Grid>
                            <Column lg={10} md={5} sm={4} xs={4} className='left'>
                                <Chart/>
                                <Chart xs/>
                            </Column>
                            <Column lg={6} md={3} sm={4} xs={4} className='right'>
                                <p>A global consumer survey conducted by Content Square (leader in digital experience
                                    analytics) indicates that only 15% of respondents are satisfied with their online
                                    shopping experience. In the last 6 months of 2022, data show increasing
                                    customers problems with their packaging</p>
                            </Column>
                        </Grid>
                        <div className='data'>
                            <div className='item'>
                                <h1 className='head'>Benefits within a year</h1>
                            </div>
                            {[0, 1, 2, 3].map((idx) => (<div
                                key={idx}
                                className='item'>

                                <p>{t(`data.${idx}.title`)}</p>
                                <p>{['+', '', '-', ''][idx]}<CountUp end={[45, 3, 45, 100][idx]} enableScrollSpy
                                    scrollSpyDelay={500}/>{['%', '', '%', '%'][idx]}
                                </p>

                            </div>))}
                        </div>
                    </div>
                </Column>

                <Footer/>
            </RetailerLayout>
        </>
    );
};

export default RetailerLanding;
