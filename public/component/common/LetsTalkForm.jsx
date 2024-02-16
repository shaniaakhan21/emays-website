import { Grid, Row, Column as Col } from '@carbon/react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

// SCSS
import './../../scss/component/retailer/letsTalkForm.scss';
// Components
import TextAreaCustom from './TextAreaCustom';
import CheckBoxCustom from './CheckBoxCustom';
import ButtonCustom from './ButtonCustom';
import TextBoxCustom from './TextBoxCustom';
// Images
import Logo from '../../logo/emays-logo-black.png';
import EmailIcon from '../../images/mail.svg';
import PhoneIcon from '../../images/phone.svg';
import InstagramIcon from '../../images/logo--instagram.svg';
import FacebookIcon from '../../images/fb.svg';
import LinkedInIcon from '../../images/linkedin.svg';
import { useEffect, useReducer, useState } from 'react';
import { recaptchaKey } from '../../js/const/recaptcha';
import FormLabel from '@carbon/react/lib/components/FormLabel/FormLabel';
import ContactNumberInput from './ContactNumberInput';
import { validateEmail } from '../../js/util/validateObject';

const LetsTalkForm = ({ onSubmit }) => {
    const [translate] = useTranslation();

    const [data, setData] = useState({});

    const setValue = (e) => {
        if (e.target.name === 'privacy-policy') {
            setData(cd => ({ ...cd, [e.target.name]: e.target.checked }));
            return;
        }
        setData(cd => ({ ...cd, [e.target.name]: e.target.value }));
    };

    const t = (key) => translate(`common.lets-talk-form.${key}`);

    const [state, setFormData] = useReducer((state, action) => {
        switch (action?.type) {
            case 'setName':
                return { ...state, name: action?.data };
            case 'setEmail':
                return { ...state, email: action?.data };
            case 'setPhone':
                return { ...state, phoneNumber: action?.data };
            case 'setMessage':
                return { ...state, message: action?.data };
            case 'setSubmitted':
                return { ...state, submitted: action?.data };
            case 'setInEmailInvalid':
                return { ...state, emailInValid: action?.data };
            default:
                return { ...state };
        }
    }, {
        name: '',
        email: '',
        phoneNumber: '',
        message: '',
        submitted: false,
        emailInValid: false
    });

    useEffect(() => {
        grecaptcha.enterprise.ready(function () {
            grecaptcha.enterprise.execute(
                recaptchaKey, { action: 'letsTalk' }
            ).then(function (token) {
                setData(d => ({ ...d, reCaptcha: token }));
            });
        });
    }, []);

    return (
        <Grid fullWidth className='letsTalk'>
            <Col lg={10} md={5} sm={4} xs={4} className='left'>
                <Grid fullWidth className='form'>
                    <Col lg={8} md={8} sm={4} xs={4}>
                        <h1 className='title'>{t('header')}</h1>
                    </Col>
                    <Col lg={16} md={8} sm={4} xs={4}>
                        <FormLabel style={{ paddingBottom: '8px' }} htmlFor='name'>
                            {t('name')}
                            <span style={{ color: 'red', fontSize: '18px', paddingLeft: '5px' }}>*</span> 
                        </FormLabel>
                        <TextBoxCustom
                            placeholderText={t('name-placeholder')}
                            onChange={(e) => {
                                setValue(e);
                                setFormData({ type: 'setName', data: e.target.value }); }}
                            autocomplete='given-name'
                            name='name'
                            id='name'
                        />
                        {!state?.name && state?.submitted && 
                        <span style={{ 'color': '#ff5050', 'font-size': '14px', lineHeight: '28px' }}>
                                Please enter name</span>}
                        <br/>
                    </Col>
                    <Col lg={16} md={8} sm={4} xs={4}>
                        <FormLabel style={{ paddingBottom: '8px' }} htmlFor='email'>
                            {t('email')}
                            <span style={{ color: 'red', fontSize: '18px', paddingLeft: '5px' }}>*</span> 
                        </FormLabel>
                        <TextBoxCustom
                            id='email'
                            autocomplete='email'
                            name='email'
                            onChange={(e) => {
                                setValue(e);
                                setFormData({ type: 'setEmail', data: e.target.value }); }}
                        /> {!state?.email && state?.submitted && 
                        <span style={{ 'color': '#ff5050', 'font-size': '14px', lineHeight: '28px' }}>
                        Please enter email</span>}
                        {state?.emailInValid && state?.submitted && 
                        <span style={{ 'color': '#ff5050', 'font-size': '14px', lineHeight: '28px' }}>
                        Please enter a valid email</span>}
                        <br/>
                    </Col>
                    <Col lg={16} md={8} sm={4} xs={4} className = 'phone'>
                        <ContactNumberInput
                            id='phone'
                            actionFunc= {(value) => { setFormData({ type: 'setPhone', data: value }); }}
                        />
                        {!state?.phoneNumber && state?.submitted
                         && <span style={{ 'color': '#ff5050', 'font-size': '14px', lineHeight: '28px' }}>
                        Please enter phone</span>}
                        <br/>
                    </Col>
                    <Col lg={16} md={8} sm={4} xs={4} className={'message'}>
                        <FormLabel htmlFor='message' style={{ paddingBottom: '8px' }}>
                            {t('message')}
                            <span style={{ color: 'red', fontSize: '18px', paddingLeft: '5px' }}>*</span> 
                        </FormLabel>
                        <TextAreaCustom
                            className='message'
                            placeholder={t('message-placeholder')}
                            enableCounter
                            maxCount={100}
                            name='message'
                            id='message'
                            onChange={(e) => {
                                setValue(e);
                                setFormData({ type: 'setMessage', data: e.target.value }); }}
                        />
                        {!state?.message && state?.submitted && 
                        <span style={{ 'color': '#ff5050', 'font-size': '14px', lineHeight: '28px' }}>
                        Please enter message</span>}
                        <br/>
                    </Col>
                    <Col lg={16} md={8} sm={4} xs={4}>
                        <CheckBoxCustom
                            className='privacy'
                            labelText={t('privacy-policy')}
                            name='privacy-policy'
                            id='privacy-policy'
                            onChange={setValue}
                        />
                    </Col>
                    <Col lg={16} md={8} sm={4} xs={4}>
                        <ButtonCustom action={() => {
                            const isValidEmail = validateEmail(state?.email);
                            if (isValidEmail) {
                                setFormData({ type: 'setInEmailInvalid', data: false });
                            } else {
                                setFormData({ type: 'setInEmailInvalid', data: true });
                            }
                            setFormData({ type: 'setSubmitted', data: true });
                            if (state?.name && state?.email && state?.phoneNumber &&
                                 state?.message && !state?.emailInValid) {
                                onSubmit(data);
                            }
                        }} className='submit' text={t('submit')}/>
                    </Col>
                </Grid>
            </Col>
            <Col lg={6} md={3} sm={4} xs={4} className='right'>
                <img className='logo' src={Logo} loading='eager' 
                    alt={translate('img-alt-t-loading.common.lets-talk.emays-alt')} 
                    title={translate('img-alt-t-loading.common.lets-talk.emays-title')}/>
                <div className='email'>
                    <img src={EmailIcon} loading='eager' 
                        alt={translate('img-alt-t-loading.common.lets-talk.email-alt')} 
                        title={translate('img-alt-t-loading.common.lets-talk.email-title')}/>
                    <div>
                        <span className='title'>{t('email-2')}</span>
                        <span>{t('email-2-value')}</span>
                    </div>
                </div>
                <div className='phone'>
                    <img src={PhoneIcon} loading='eager' 
                        alt={translate('img-alt-t-loading.common.lets-talk.phone-alt')} 
                        title={translate('img-alt-t-loading.common.lets-talk.phone-title')}/>
                    <div>
                        <span className='title'>{t('phone-2')}</span>
                        <span>{t('phone-2-value')}</span>
                    </div>
                </div>
                <div className='social'>
                    <a href=''>
                        <img src={InstagramIcon} loading='eager' 
                            alt={translate('img-alt-t-loading.common.lets-talk.instagram-alt')} 
                            title={translate('img-alt-t-loading.common.lets-talk.instagram-title')} 
                            className='letstalk-insta'/>
                    </a>
                    <a href=''>
                        <img src={LinkedInIcon} loading='eager' 
                            alt={translate('img-alt-t-loading.common.lets-talk.linkedIn-alt')} 
                            title={translate('img-alt-t-loading.common.lets-talk.linkedIn-title')}/>
                    </a>
                    <a href=''>
                        <img src={FacebookIcon} loading='eager' 
                            alt={translate('img-alt-t-loading.common.lets-talk.facebook-alt')} 
                            title={translate('img-alt-t-loading.common.lets-talk.facebook-title')}/>
                    </a>
                </div>
            </Col>
        </Grid>
    );
};

LetsTalkForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
};

export default LetsTalkForm;
