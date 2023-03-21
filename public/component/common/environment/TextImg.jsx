import React from 'react';
import {
    Grid,
    Column,
    Button
} from '@carbon/react';
import '../../../scss/component/customer/textimg.scss';
import CO2SVG from '../../../images/HomeCustomerSection/tree-icon.svg';
import MountainIMG from '../../../images/HomeCustomerSection/tree.svg';
import { useTranslation } from 'react-i18next';

const TextImg = () => {
    const [t] = useTranslation();

    return (
        <Grid className='section-main custom-padding text-img-section'>
            <Column lg={8} md={4} sm={4} className='para-text-two img-position'>
                <img src={CO2SVG}/>
                <h1 className='margin-left-21' >
                    {t('text-img.text-h1-01')}
                    <strong>
                        {t('text-img.text-h1-02')}
                    </strong>{t('text-img.text-h1-03')}
                </h1><br></br>
                <h5 className='margin-top-4'>
                    {t('text-img.text-h5')}
                </h5>
                <Button className='env-button'>
                    {t('text-img.btn-text')}
                </Button>
            </Column>
            <Column lg={8} md={4} sm={4} className='Img-Position'>
                <img src={MountainIMG}/>
            </Column>
        </Grid>
    );
};

export default TextImg;
