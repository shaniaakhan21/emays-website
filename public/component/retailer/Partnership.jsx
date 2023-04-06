import { Column as Col, Column } from '@carbon/react';
import { useTranslation } from 'react-i18next';
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';                                                                                  
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

//                                                                   Components
import RetailerLayout from '../common/RetailerLayout';

//                                                                   SCSS
import '../../scss/component/retailer/partnership.page.scss';
import Chart from '../common/Chart';
import LouisVuittonLogo from '../../images/logo-louisVuitton.svg';
import YSLLogo from '../../images/logo-ysl.svg';
import PRADA from '../../images/HomeCustomerSection/PRADA.svg';
import CHANEL from '../../images/HomeCustomerSection/CHANEL.svg';
import CASSANDRE from '../../images/HomeCustomerSection/CASSANDRE.svg';
import ErrorBoundary from '../ErrorBoundary';

const RetailerPartnership = () => {
    const [translate] = useTranslation();

    const t = (key) => translate(`retailer.partnership.${key}`);

    useEffect(() => {
        AOS.init({ once: true });
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000
    };

    return (
        <ErrorBoundary>
            <Column lg={16} md={8} sm={4} xs={4} id='partnership-start'>
                <RetailerLayout withoutNav className='partnership'>
                    <Col lg={16} md={8} sm={4} xs={4} 
                        data-aos='fade-in' data-aos-easing='linear' data-aos-duration='1000'>
                        <h1 className='header'>{t('title')}</h1>
                    </Col>
                    <Col lg={16} md={5} sm={4} xs={4} className='infos-one'>
                        {[0, 1].map((idx) => (<div 
                            key={idx}
                            data-aos='fade-right'
                            data-aos-easing='linear'
                            data-aos-duration='1000'
                            data-aos-delay={idx * 300}
                            className='item'>
                            
                            <h2>{t(`infos.${idx}.title`)}</h2>
                            <p>{t(`infos.${idx}.description`)}</p>
                            
                        </div>))}
                    </Col>
                    <Col lg={16} md={5} sm={4} xs={4} className='infos-one'>
                        {[2].map((idx) => (<div 
                            key={idx}
                            data-aos='fade-right'
                            data-aos-easing='linear'
                            data-aos-duration='1000'
                            data-aos-delay={idx * 300}
                            className='item'>
                            
                            <h2>{t(`infos.${idx}.title`)}</h2>
                            <p>{t(`infos.${idx}.description`)}</p>
                            <ul>
                                <li>{t(`infos.${idx}.list-description.list-item-one`)}</li>
                                <li>{t(`infos.${idx}.list-description.list-item-two`)}</li>
                                <li>{t(`infos.${idx}.list-description.list-item-three`)}</li>
                                <li>{t(`infos.${idx}.list-description.list-item-four`)}</li>
                            </ul>
                            
                        </div>))}
                    </Col>
                    <Col lg={16} md={5} sm={4} xs={4} className='infos-two'>
                        {[3].map((idx) => (<div 
                            key={idx}
                            className='item'>
                            
                            <h2
                                data-aos='fade-right'
                                data-aos-easing='linear'
                                data-aos-duration='1000'
                            >
                                {t(`infos.${idx}.title`)}
                            </h2>

                            {[0, 1].map((idnx) => (<div 
                                key={idnx}
                                data-aos='fade-right'
                                data-aos-easing='linear'
                                data-aos-duration='1000'
                                data-aos-delay={idnx * 300}
                            >
                                <h3>{t(`infos.${idx}.sub-items.${idnx}.title`)}</h3>
                                <p>{t(`infos.${idx}.sub-items.${idnx}.description`)}</p>
                            </div>))}
                        </div>))}
                    </Col>
                    <Col lg={16} md={5} sm={4} xs={4} className='infos-two'>
                        {[4].map((idx) => (<div 
                            key={idx}
                            data-aos='fade-right'
                            data-aos-easing='linear'
                            data-aos-duration='1000'
                            data-aos-delay={idx * 100}
                            className='item'>
                            
                            <h2>{t(`infos.${idx}.title`)}</h2>
                            <p>{t(`infos.${idx}.description`)}</p>
                            
                        </div>))}
                    </Col>
                    <Col lg={8} md={3} sm={4} xs={4} />
                    <Col lg={16} md={8} sm={4} xs={4} className='chart-row'>
                        <div className='chart-info'>
                            <p>{t('chart-info')}</p>
                        </div>
                        <div className='chart'>
                            <Chart />
                        </div>
                        <div className='chart-xs'>
                            <Chart xs />
                        </div>
                    </Col>
                    <Col lg={16} md={8} sm={4} xs={4} className='data'>
                        {[0, 1, 2, 3].map((idx) => (<div 
                            key={idx}
                            data-aos='fade-up'
                            data-aos-easing='linear'
                            data-aos-duration='1000'
                            data-aos-delay={idx * 300}
                            className='item'>
                            
                            <p>{t(`data.${idx}.title`)}</p>
                            <p>{t(`data.${idx}.value`)}</p>
                        
                        </div>))}
                    </Col>
                    <Column lg={16} md={8} sm={4} xs={4} className='logos'  
                        data-aos='fade-in' data-aos-easing='linear' data-aos-duration='1000' data-aos-delay='300'>
                        <div className='marquee'>
                            <div className='marquee__group'>
                                <img src={LouisVuittonLogo} alt='Louis Vuitton Logo' />
                                <img src={YSLLogo} alt='YSL Logo' />
                                <img className='chanel-prada' src={CHANEL} alt='ChaneL Logo' />
                                <img className='chanel-prada' src={PRADA} alt='Prada Logo' />
                                <img src={LouisVuittonLogo} alt='Louis Vuitton Logo' />
                                <img src={YSLLogo} alt='YSL Logo' />
                            </div>
                        </div>
                    </Column>
                    <Column className='carousel-on-phone'>
                        <Slider {...settings}>
                            <div>
                                <img src={LouisVuittonLogo} alt='Image 1' />
                            </div>
                            <div>
                                <img src={CASSANDRE} alt='Image 2' />
                            </div>
                            <div>
                                <img src={CHANEL} alt='Image 3' />
                            </div>
                            <div>
                                <img src={PRADA} alt='Image 4' />
                            </div>
                        </Slider>
                    </Column>
                </RetailerLayout>
                {/* <img src={PartnersFooterImage} alt='Partners Footer' className='partners-footer' /> */}
            </Column>
        </ErrorBoundary>
    );
};

export default RetailerPartnership;
