import React from 'react';
import {
    Grid,
    Column
} from '@carbon/react';
import '../../../scss/component/customer/imgtexticon.scss';
import CO2SVG from '../../../images/HomeCustomerSection/packaging-free-icon.svg';
import MountainIMG from '../../../images/HomeCustomerSection/packaging-free.svg';
import { useTranslation } from 'react-i18next';

const ImgTextIcon = () => {
    const [t] = useTranslation();
    return (
        <Grid className='section-main custom-padding'>
            <Column lg={5} md={3} sm={4}className='Img-Position'>
                <img src={MountainIMG}/>
            </Column>
            <Column lg={8} md={3} sm={3} className='para-text-two margin-left-11'>
                <h1 className='margin-left-24' >{t('img-text-icon.text-h1')}</h1><br></br>
                <h5>
                    {t('img-text-icon.text-h5')}
                </h5>
            </Column>
            <Column lg={3} md={2} sm={1} className='CO2-neutral-img'>
                <img src={CO2SVG}/>
            </Column>
        </Grid>
    );
};

export default ImgTextIcon;
