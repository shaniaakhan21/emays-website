import React, { useEffect } from 'react';
import '../../../scss/component/dashboard/login.scss';
import LOGO from '../../../images/Dashboard/EMAYS-LOGO.svg'; 
import TextBoxCustom from '../../common/TextBoxCustom';
import TextBoxPassword from '../../common/TextBoxPassword';
import ButtonCustom from '../../common/ButtonCustom';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { getLaunchType, setLaunchType } from '../../../js/util/SessionStorageUtil';
import { useNavigate } from 'react-router-dom';
import { EMAIL_BOOKED, EMAIL_INVOICE, EMAIL_REMINDER,
    EMAIL_TODAY, PRODUCT_LAUNCH } from '../../../js/const/SessionStorageConst';

const RetailerLogin = ({ exeLogin = () => {} }) => {

    const [formData, updateFormData] = useState( { username: '', password: '' } );
    const [error, updateError] = useState( { usernameError: false, passwordError: false });

    const [t] = useTranslation();

    const launchType = getLaunchType();
    const history = useNavigate();
    useEffect(() => {
        // IMPORTANT: make sure you set the launch type to empty within each launch.
        switch (launchType) {
            case PRODUCT_LAUNCH:
                setLaunchType('');
                history('/checkout');
                break;
            case EMAIL_BOOKED:
            case EMAIL_REMINDER:
            case EMAIL_TODAY:
            case EMAIL_INVOICE:
                setLaunchType('');
                const params = new URLSearchParams({
                    launchType: launchType
                });
                history(`/appointment?${params.toString()}`);
                break;
            default:
                break;
        }
    }, [launchType]);
    
    return (
        <>
            {
                (launchType === 'dashboard') && <div className='cds--grid login-container'>
                    <div className='cds--row'>
                        <div className='cds--col'>
                            <div className='image-container'>
                                <img src={LOGO} height={'140px'} width={'144px'} alt='EMAYS' />
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
                                    labelText='Username'
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
                                    placeholderText='**********'
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
                                customStyle={ { width: '288px', background: '#525252' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default React.memo(RetailerLogin);
