import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
    Grid,
    Column,
    Button
} from '@carbon/react';
import '../../../scss/component/customer/textimg.scss';
import CO2SVG from '../../../images/one-tree-planted-logo-white 1.svg';
import MountainIMG from '../../../images/HomeCustomerSection/tree.svg';
import { useTranslation } from 'react-i18next';
import PhoneMountainIMG from '../../../images/fourth-img-xs.png';

const TextImg = () => {
    const [t] = useTranslation();

    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <Grid className='section-main text-img-section'>
            <Column sm={4} className='phone-mountain-img'>
                <img data-aos='zoom-in' data-aos-easing='linear' data-aos-duration='1000' src={PhoneMountainIMG}/>
            </Column>
            <Column lg={8} md={4} sm={4} className='para-text-two img-position'>
                <img data-aos='zoom-in' data-aos-easing='linear' data-aos-duration='1000' src={CO2SVG}/>
                <h5 data-aos='fade-in' data-aos-easing='linear' data-aos-duration='1000' className='margin-top-4'>
                    {t('text-img.text-h5')}
                </h5>
                <a className='btn' href='https://onetreeplanted.org/' target='_blank' rel='noreferrer'>
                    <Button data-aos='fade-in' data-aos-easing='linear' data-aos-duration='1000' className='env-button'>
                        {t('text-img.btn-text')}
                    </Button>
                </a>
            </Column>
            <Column lg={8} md={4} sm={4} className='Img-Position'>
                <img data-aos='zoom-in' data-aos-easing='linear' data-aos-duration='1000' src={MountainIMG}/>
            </Column>
        </Grid>
    );
};

export default TextImg;
