import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
    Grid,
    Column
} from '@carbon/react';
import '../../../scss/component/customer/iconimgtext.scss';
import CO2SVG from '../../../images/HomeCustomerSection/journey-icon.svg';
import MountainIMG from '../../../images/HomeCustomerSection/journey.svg';
import { useTranslation } from 'react-i18next';
import PhoneMountainIMG from '../../../images/second-img-xs.png';

const IconImgText = () => {
    const [t] = useTranslation();

    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <Grid className='section-main'>
            <Column sm={4} className='phone-mountain-img'>
                <img data-aos='zoom-in' data-aos-easing='linear' data-aos-duration='1000' src={PhoneMountainIMG}
                    loading='eager' 
                    alt={t('img-alt-t-loading.common.environment.icon-img-txt.mountain-alt')} 
                    title={t('img-alt-t-loading.common.environment.icon-img-txt.mountain-title')}/>
            </Column>
            <Column lg={3} md={2} sm={1} className='CO2-neutral-img'>
                <img data-aos='zoom-in' data-aos-easing='linear' data-aos-duration='1000' src={CO2SVG}
                    loading='eager' 
                    alt={t('img-alt-t-loading.common.environment.icon-img-txt.co2svg-alt')} 
                    title={t('img-alt-t-loading.common.environment.icon-img-txt.co2svg-title')}/>
            </Column>
            <Column lg={5} md={3} sm={3} className='Img-Position'>
                <img data-aos='zoom-in' data-aos-easing='linear' data-aos-duration='1000' src={MountainIMG}
                    loading='eager' 
                    alt={t('img-alt-t-loading.common.environment.icon-img-txt.mountain-alt')} 
                    title={t('img-alt-t-loading.common.environment.icon-img-txt.mountain-title')}/>
            </Column>
            <Column lg={8} md={3} sm={4} className='para-text-two'>
                <h1 data-aos='fade-in' data-aos-easing='linear' data-aos-duration='1000'>{t('icon-img-text.text-h1')}
                </h1>
                <h5 data-aos='fade-in' data-aos-easing='linear' data-aos-duration='1000'> 
                    {t('icon-img-text.text-h5')}
                </h5>
            </Column>
        </Grid>
    );
};

export default IconImgText;
