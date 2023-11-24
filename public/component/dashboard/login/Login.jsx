import React, { useEffect } from 'react';
import '../../../scss/component/dashboard/login.scss';
import LOGO from '../../../images/Dashboard/EMAYS-LOGO.svg'; 
import TextBoxCustom from '../../common/TextBoxCustom';
import TextBoxPassword from '../../common/TextBoxPassword';
import ButtonCustom from '../../common/ButtonCustom';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

const RetailerLogin = ({ exeLogin = () => {} }) => {

    const [formData, updateFormData] = useState( { username: '', password: '' } );
    const [error, updateError] = useState( { usernameError: false, passwordError: false });

    const [t] = useTranslation();
    
    return (

        <div className='cds--grid login-container'>
            <div className='cds--row'>
                <div className='cds--col'>
                    <div className='image-container'>
                        <img src={LOGO} height={'100px'} width={'130px'} alt='EMAYS' />
                    </div>
                </div>
                {/* <div className='cds--col'>
                    <div className='retailer-head'>
                        <h3>{t('dashboard.login.heading-retailer')}</h3>
                    </div>
                </div> */}
            </div>
            <div className='cds--row'>
                <div className='cds--col text-container'>
                    <div>
                        <TextBoxCustom
                            id='login_username'
                            onChange={(event) => { 
                                if (event.target.value) {
                                    updateError({ ...error, usernameError: false });
                                } else {
                                    updateError({ ...error, usernameError: true });
                                }
                                updateFormData( { ...formData, username: event.target.value });
                            }}
                            labelText='Account Username'
                            placeholderText='username'
                            name='account-email'
                            customStyle={{ width: '313px' }}
                        />
                        {error.usernameError && 
                            <div className='error'>{t('dashboard.login.error.invalid-username')}</div>}
                    </div>
                </div>
            </div>

            <div className='cds--row'>
                <div className='cds--col text-container'>
                    <div>
                        <TextBoxPassword
                            id='login_password'
                            onChange={(event) => { 
                                if (event.target.value) {
                                    updateError({ ...error, passwordError: false });
                                } else {
                                    updateError({ ...error, passwordError: true });
                                }
                                updateFormData( { ...formData, password: event.target.value }); } }
                            labelText='Password'
                            hidePasswordLabel='Hide password'
                            customStyle={{ width: '313px' }}
                        />
                        {error.passwordError && 
                            <div className='error'>{t('dashboard.login.error.invalid-password')}</div>}
                    </div>
                </div>
            </div>

            <div className='cds--row'>
                <div className='cds--col button-container'>
                    <div>
                        <ButtonCustom action={
                            async () => {
                                if (!formData.username) {
                                    updateError({ ...error, usernameError: true });
                                    return;
                                } else if (!formData.password) {
                                    updateError({ ...error, passwordError: true });
                                    return;
                                }
                                exeLogin({
                                    ...formData
                                });
                            }} className='submit'
                        text={t('dashboard.login.button-text')}
                        customStyle={ { width: '313px', background: '#525252' }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(RetailerLogin);
