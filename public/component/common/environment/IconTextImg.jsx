import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
    Grid,
    Column
} from '@carbon/react';
import '../../../scss/component/customer/icontextimg.scss';
import CO2SVG from '../../../images/HomeCustomerSection/CO2.svg';
import MountainIMG from '../../../images/HomeCustomerSection/mountain.svg';
import PhoneMountainIMG from '../../../images/first-img-xs.png';
import { useTranslation } from 'react-i18next';

const IconTextImg = () => {
    const [t] = useTranslation();

    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <Grid className='main-section'>
            <Column sm={4} className='phone-mountain-img'>
                <img data-aos='zoom-in' data-aos-easing='linear' data-aos-duration='1000' src={PhoneMountainIMG}/>
            </Column>
            <Column lg={4} md={2} sm={1} xs={0.5} className='CO2-neutral'>
                <img data-aos='zoom-in' data-aos-easing='linear' data-aos-duration='1000' src={CO2SVG}/>
            </Column>
            <Column lg={8} md={3} sm={4} xs={0.5} className='para-text'>
                <h5 data-aos='fade-in' data-aos-easing='linear' data-aos-duration='1000' data-aos-delay='500'>
                    {t('icon-text-img.text-h5')}
                </h5>
            </Column>
            <Column lg={4} md={3} sm={4} xs={2} className='mountain-img'>
                <img data-aos='zoom-in' data-aos-easing='linear' data-aos-duration='1000' 
                    data-aos-delay='500' src={MountainIMG}/>
            </Column>
        </Grid>
    );
};

export default IconTextImg;
