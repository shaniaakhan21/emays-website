import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
    Grid,
    Column
} from '@carbon/react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import '../../scss/component/customer/services.scss';
import LV from '../../images/HomeCustomerSection/LV.svg';
import CASSANDRE from '../../images/HomeCustomerSection/CASSANDRE.svg';
import PRADA from '../../images/HomeCustomerSection/PRADA.svg';
import CHANEL from '../../images/HomeCustomerSection/CHANEL.svg';
import Nav from '../common/Nav';
import { useTranslation } from 'react-i18next';

const Services = () => {
    useEffect(() => {
        AOS.init();
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

    const [t] = useTranslation();
    return (
        <> 
            <Grid className='grid-section' id='services-start'>
                <Column lg={16} md={8} sm={4} className='head-section'>
                    <h1 data-aos='fade-in' data-aos-easing='linear' data-aos-duration='1000' >
                        {t('services.text-h1')}
                    </h1>
                </Column>
                <Column lg={8} md={4} sm={2} className='brand-row'>
                    <img data-aos='fade-in' data-aos-easing='linear' data-aos-duration='1500' data-aos-delay='300' 
                        className='LV' src={LV}/>
                    <img data-aos='fade-in' data-aos-easing='linear' data-aos-duration='1500' data-aos-delay='300' 
                        className='CASSANDRE' src={CASSANDRE}/>

                </Column>
                <Column lg={8} md={4} sm={2} className='brand-column'>
                    <img data-aos='fade-in' data-aos-easing='linear' data-aos-duration='1500' 
                        data-aos-delay='500' src={CHANEL}/>
                    <img data-aos='fade-in' data-aos-easing='linear' data-aos-duration='1500' 
                        data-aos-delay='500' src={PRADA}/>
                </Column>
                <Column lg={16} md={8} sm={4} className='carousel-on-phone'>
                    <Slider {...settings}>
                        <div>
                            <img src={LV} alt='Image 1' className='lv' />
                        </div>
                        <div>
                            <img src={CASSANDRE} alt='Image 2' className='cassandre' />
                        </div>
                        <div>
                            <img src={CHANEL} alt='Image 3' className='channel' />
                        </div>
                        <div>
                            <img src={PRADA} alt='Image 4' className='prada' />
                        </div>
                    </Slider>
                </Column>
            </Grid>
        </>
    );
};

export default Services;
