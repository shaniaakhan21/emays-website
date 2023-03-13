import React from 'react';
import {
    Grid,
    Column
} from '@carbon/react';
import '../../../scss/component/customer/environmentheader.scss';
import CO2Neutral from '../../../images/HomeCustomerSection/co2-neutral.svg';
import { useTranslation } from 'react-i18next';

const EnvironmentHeader = () => {
    const [t] = useTranslation();

    return (
        <Grid className='env-section'>
            <div className='overlay-bg' lg={16}>
                <Column lg={16} md={16} sm={16}>
                    <div className='env-header'>
                        <h1>{t('environment-header.env-header-h1')}</h1>
                    </div>
                </Column>
                <div className='subhead-section'>
                    <Column className='CO2-img'>
                        <div className='env-icon'>
                            <img src={CO2Neutral}/>
                            <h5>{t('environment-header.env-header-h5')}</h5>
                        </div>
                    </Column>
                    <Column className='carbon' style={{ marginTop: '5.5%' }}>
                        <div className='env-sub-heading'>
                            <h5>{t('environment-header.env-header-h5-subhead')}</h5>
                        </div>
                    </Column>
                </div>
            </div>
        </Grid>
    );
};

export default EnvironmentHeader;
