import React from 'react';
import {
    Grid,
    Column,
} from '@carbon/react';
import '../../../scss/component/customer/environmentheader.scss';
import CO2Neutral from '../../../images/HomeCustomerSection/co2-neutral.svg';

const EnvironmentHeader = () => {
    return (
        <Grid className='env-section'>
            <div className='overlay-bg' lg={16}>
                <Column lg={16} >
                    <div className='env-header'>
                        <h1>“FASHION SHOULDN’T COST THE EARTH”</h1>
                    </div>
                </Column>
                <div className='subhead-section'>
                    <Column lg={6} >
                        <div className='env-icon'>
                            <img src={CO2Neutral}/>
                            <h5>CO2 Neutral</h5>
                        </div>
                    </Column>
                    <Column lg={6} style={{ marginTop: '5.5%' }}>
                        <div className='env-sub-heading'>
                            <h5>Carbon footprint is considered with every step of our service.</h5>
                        </div>
                    </Column>
                </div>
            </div>
        </Grid>
    );
};

export default EnvironmentHeader;
