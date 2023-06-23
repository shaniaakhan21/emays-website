import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
    Grid,
    Column
} from '@carbon/react';
import '../../../scss/component/customer/icontextimg.scss';
import CO2SVG from '../../../images/HomeCustomerSection/CO2.svg';
import MountainIMG from '../../../images/ice.png';
import { useTranslation } from 'react-i18next';

const IconTextImg = () => {
    const [t] = useTranslation();

    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <div className='main-section2'>
            <div className='phone-mountain-img ice'>
                <img data-aos='zoom-in' data-aos-easing='linear' data-aos-duration='1000' src={MountainIMG}
                    loading='eager' 
                    alt={t('img-alt-t-loading.common.environment.icon-txt-img.mountain-alt')} 
                    title={t('img-alt-t-loading.common.environment.icon-txt-img.mountain-title')}/>
            </div>
            <div className='CO2-neutral'>
                <img data-aos='zoom-in' data-aos-easing='linear' data-aos-duration='1000' src={CO2SVG}
                    loading='eager' 
                    alt={t('img-alt-t-loading.common.environment.icon-txt-img.co2svg-alt')} 
                    title={t('img-alt-t-loading.common.environment.icon-txt-img.co2svg-title')}/>
            </div>
            <div className='para-text'>
                <h5 data-aos='fade-in' data-aos-easing='linear' data-aos-duration='1000' data-aos-delay='500'>
                    {t('icon-text-img.text-h5')}
                </h5>
            </div>
            <div className='mountain-img'>
                <img data-aos='zoom-in' data-aos-easing='linear' data-aos-duration='1000'
                    data-aos-delay='500' src={MountainIMG} loading='eager' 
                    alt={t('img-alt-t-loading.common.environment.icon-txt-img.mountain-alt')} 
                    title={t('img-alt-t-loading.common.environment.icon-txt-img.mountain-title')}/>
            </div>
        </div>
    );
};

export default IconTextImg;
