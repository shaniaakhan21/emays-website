import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
    Grid,
    Column
} from '@carbon/react';
import '../../../scss/component/customer/environmentheader.scss';
import CO2Neutral from '../../../images/HomeCustomerSection/co2-neutral.svg';
import { useTranslation } from 'react-i18next';

const EnvironmentHeader = () => {
    const [t] = useTranslation();

    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <Grid className='env-section'>
            <div className='overlay-bg' lg={16}>
                <Column lg={16} md={16} sm={16}>
                    <div className='env-header'>
                        <h1 data-aos='fade-in' data-aos-easing='linear' data-aos-duration='1000'>
                            {t('environment-header.env-header-h1')}</h1>
                    </div>
                </Column>
                <div className='subhead-section'>
                    <Column className='CO2-img'>
                        <div className='env-icon'>
                            <img data-aos='fade-in' data-aos-easing='linear' data-aos-duration='1000' 
                                data-aos-delay='300' src={CO2Neutral}/>
                            <h5 data-aos='fade-in' data-aos-easing='linear' data-aos-duration='1000' 
                                data-aos-delay='300' >{t('environment-header.env-header-h5')}</h5>
                        </div>
                    </Column>
                    <Column className='carbon' style={{ marginTop: '5.5%' }}>
                        <div className='env-sub-heading'>
                            <h5 data-aos='fade-in' data-aos-easing='linear' data-aos-duration='1000' 
                                data-aos-delay='300' >{t('environment-header.env-header-h5-subhead')}</h5>
                        </div>
                    </Column>
                </div>
            </div>
        </Grid>
    );
};

export default EnvironmentHeader;
