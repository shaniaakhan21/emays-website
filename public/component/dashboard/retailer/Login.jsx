import '../../../scss/component/dashboard/retailer/login.scss';
import { Grid, Column } from '@carbon/react';
import LOGO from '../../../images/Dashboard/EMAYS-LOGO.svg'; 
import TextBoxCustom from '../../common/TextBoxCustom';
import TextBoxPassword from '../../common/TextBoxPassword';
import ButtonCustom from '../../common/ButtonCustom';
import { useTranslation } from 'react-i18next';

const RetailerLogin = () => {
    const { t } = useTranslation();
    return (
        
        <Grid fullWidth className='Retailer_login'>
            <Column lg={16} md={8} sm={4} xs={4}>
                <Grid fullWidth className='first-row'>
                    <Column lg={8} md={4} sm={4} xs={4}>
                        <img src={LOGO} alt='EMAYS' />
                    </Column>
                    <Column lg={8} md={4} sm={4} xs={4} className='col-text-head'>
                        <div className='retailer-head-box'>
                            <h1>{t('dashboard.login.title')}</h1>
                        </div>
                    </Column>
                </Grid>
                <Column lg={16} md={8} sm={4} xs={4} className='first-box'>
                    <TextBoxCustom
                        labelText={t('dashboard.login.email-label')}
                        placeholderText={t('dashboard.login.email-placeholder')}
                        autocomplete='given-email'
                        name='Account Email'
                    />
                </Column>
                <Column lg={16} md={8} sm={4} xs={4} className='first-box'>
                    <TextBoxPassword
                        labelText={t('dashboard.login.label-password')}
                        hidePasswordLabel='Hide password'
                    />
                </Column>
                <Column lg={16} md={8} sm={4} xs={4} className='login-button'>
                    <ButtonCustom action={() => onSubmit(data)} className='submit' 
                        text={t('dashboard.login.submit-btn-text')} />
                </Column>
            </Column>
        </Grid>
    );
};

export default RetailerLogin;
