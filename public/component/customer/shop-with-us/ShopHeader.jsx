import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Grid, Column } from '@carbon/react';
import '../../../scss/component/customer/shopheader.scss';
import { useTranslation } from 'react-i18next';

const ShopHeader = () => {
    useEffect(() => {
        AOS.init();
    }, []);

    const [t] = useTranslation();

    return ( 
        <Grid className='section-box'>
            <Column lg={16} md={8} sm={4} className='head-section'>
                <h1 data-aos='fade-in' data-aos-easing='linear' data-aos-duration='1000'>
                    {t('shop-with-us.first-block.main-heading')}
                </h1>
            </Column>
        </Grid>
    );
};

export default ShopHeader;
