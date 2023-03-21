import React from 'react';
import {
    Grid,
    Column
} from '@carbon/react';
import '../../scss/component/customer/services.scss';
import LV from '../../images/HomeCustomerSection/LV.svg';
import CASSANDRE from '../../images/HomeCustomerSection/CASSANDRE.svg';
import PRADA from '../../images/HomeCustomerSection/PRADA.svg';
import CHANEL from '../../images/HomeCustomerSection/CHANEL.svg';
import Nav from '../common/Nav';
import ButtonCustom from '../common/ButtonCustom';
import MailIcon from '../../images/HomeCustomerSection/email-icon.svg';
import { useTranslation } from 'react-i18next';

const Services = () => {
    const [t] = useTranslation();
    return (
        <>  <Nav/>
            <Grid className='grid-section'>
                <Column lg={16} md={8} sm={4} className='head-section'>
                    <h1>
                        {t('services.text-h1')}
                    </h1>
                </Column>
                <Column lg={8} md={4} sm={2} className='brand-row'>
                    <img className='LV' src={LV}/>
                    <img className='CASSANDRE' src={CASSANDRE}/>

                </Column>
                <Column lg={8} md={4} sm={2} className='brand-column'>
                    <img src={CHANEL}/>
                    <img src={PRADA}/>
                </Column>
                <Column lg={16} md={8} sm={4} xs={4} className='buttons'>
                    <ButtonCustom action={() => {}} text={'Do you have a store? Work with us'} />
                    <ButtonCustom
                        action={() => {}}
                        iconDescription='E-Mail'
                        hasIconOnly
                        renderIcon={() => <img src={MailIcon} alt='E-Mail' />}
                    />
                </Column>
                <Column className='foot-col' lg={16} md={8} sm={4} >
                </Column>
            </Grid>
        </>
    );
};

export default Services;
