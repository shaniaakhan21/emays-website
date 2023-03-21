import React from 'react';
import {
    Grid,
    Column
} from '@carbon/react';
import '../../../scss/component/customer/iconimgtext.scss';
import CO2SVG from '../../../images/HomeCustomerSection/journey-icon.svg';
import MountainIMG from '../../../images/HomeCustomerSection/journey.svg';
import { useTranslation } from 'react-i18next';

const IconImgText = () => {
    const [t] = useTranslation();
    return (
        <Grid className='section-main'>
            <Column lg={3} md={2} sm={1} className='CO2-neutral-img'>
                <img src={CO2SVG}/>
            </Column>
            <Column lg={5} md={3} sm={3} className='Img-Position'>
                <img src={MountainIMG}/>
            </Column>
            <Column lg={8} md={3} sm={4} className='para-text-two'>
                <h1>{t('icon-img-text.text-h1')}
                </h1>
                <h5>
                    {t('icon-img-text.text-h5')}
                </h5>
            </Column>
        </Grid>
    );
};

export default IconImgText;
