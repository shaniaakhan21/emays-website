import React from 'react';
import {
    Grid,
    Column
} from '@carbon/react';
import '../../../scss/component/customer/icontextimg.scss';
import CO2SVG from '../../../images/HomeCustomerSection/CO2.svg';
import MountainIMG from '../../../images/HomeCustomerSection/mountain.svg';
import { useTranslation } from 'react-i18next';

const IconTextImg = () => {
    const [t] = useTranslation();
    return (
        <Grid className='main-section'>
            <Column lg={4} md={2} sm={1} xs={0.5} className='CO2-neutral'>
                <img src={CO2SVG}/>
            </Column>
            <Column lg={8} md={3} sm={4} xs={0.5} className='para-text'>
                <h5>
                    {t('icon-text-img.text-h5')}
                </h5>
            </Column>
            <Column lg={4} md={3} sm={4} xs={2} className='mountain-img'>
                <img src={MountainIMG}/>
            </Column>
        </Grid>
    );
};

export default IconTextImg;
