import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
    Grid,
    Column,
    Button
} from '@carbon/react';
import '../../../scss/component/customer/textimg.scss';
import CO2SVG from '../../../images/HomeCustomerSection/tree-icon.svg';
import MountainIMG from '../../../images/HomeCustomerSection/tree.svg';
import { useTranslation } from 'react-i18next';
import PhoneMountainIMG from '../../../images/fourth-img-xs.png';

const TextImg = () => {
    const [t] = useTranslation();

    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <Grid className='section-main custom-padding text-img-section'>
            <Column sm={4} className='phone-mountain-img'>
                <img data-aos='zoom-in' data-aos-easing='linear' data-aos-duration='1000' src={PhoneMountainIMG}/>
            </Column>
            <Column lg={8} md={4} sm={4} className='para-text-two img-position'>
                <img data-aos='zoom-in' data-aos-easing='linear' data-aos-duration='1000' src={CO2SVG}/>
                <h1 data-aos='fade-in' data-aos-easing='linear' data-aos-duration='1000' className='margin-left-21' >
                    {t('text-img.text-h1-01')}
                    <strong>
                        {t('text-img.text-h1-02')}
                    </strong>{t('text-img.text-h1-03')}
                </h1><br></br>
                <h5 data-aos='fade-in' data-aos-easing='linear' data-aos-duration='1000' className='margin-top-4'>
                    {t('text-img.text-h5')}
                </h5>
                <Button data-aos='fade-in' data-aos-easing='linear' data-aos-duration='1000' className='env-button'>
                    {t('text-img.btn-text')}
                </Button>
            </Column>
            <Column lg={8} md={4} sm={4} className='Img-Position'>
                <img data-aos='zoom-in' data-aos-easing='linear' data-aos-duration='1000' src={MountainIMG}/>
            </Column>
        </Grid>
    );
};

export default TextImg;
