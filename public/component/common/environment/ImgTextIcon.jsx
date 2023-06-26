import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
    Grid,
    Column
} from '@carbon/react';
import '../../../scss/component/customer/imgtexticon.scss';
import CO2SVG from '../../../images/HomeCustomerSection/packaging-free-icon.svg';
import MountainIMG from '../../../images/HomeCustomerSection/packaging-free.svg';
import { useTranslation } from 'react-i18next';
import PhoneMountainIMG from '../../../images/third-img-xs.png';

const ImgTextIcon = () => {
    const [t] = useTranslation();

    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <Grid className='section-main'>
            <Column sm={4} className='phone-mountain-img'>
                <img data-aos='zoom-in' data-aos-easing='linear' data-aos-duration='1000' src={PhoneMountainIMG}
                    loading='eager' 
                    alt={t('img-alt-t-loading.common.environment.img-txt-icon.img-alt')} 
                    title={t('img-alt-t-loading.common.environment.img-txt-icon.img-title')}/>
            </Column>
            <Column lg={5} md={3} sm={4}className='Img-Position'>
                <img data-aos='zoom-in' data-aos-easing='linear' data-aos-duration='1000' src={MountainIMG}
                    loading='eager' 
                    alt={t('img-alt-t-loading.common.environment.img-txt-icon.img-alt')} 
                    title={t('img-alt-t-loading.common.environment.img-txt-icon.img-title')}/>
            </Column>
            <Column lg={8} md={3} sm={4} className='para-text-two margin-left-8'>
                <h1 data-aos='fade-in' data-aos-easing='linear' data-aos-duration='1000' className='margin-left-24' >
                    {t('img-text-icon.text-h1')}</h1><br></br>
                <h5 data-aos='fade-in' data-aos-easing='linear' data-aos-duration='1000'>
                    {t('img-text-icon.text-h5')}
                </h5>
            </Column>
            <Column lg={3} md={2} sm={1} className='CO2-neutral-img'>
                <img data-aos='zoom-in' data-aos-easing='linear' data-aos-duration='1000' src={CO2SVG}
                    loading='eager' 
                    alt={t('img-alt-t-loading.common.environment.img-txt-icon.icon-alt')} 
                    title={t('img-alt-t-loading.common.environment.img-txt-icon.icon-title')}/>
            </Column>
        </Grid>
    );
};

export default ImgTextIcon;
