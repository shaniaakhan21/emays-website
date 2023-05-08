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
import { useEffect, useState } from 'react';
import { recaptchaKey } from '../../js/const/recaptcha';
import Checkbox from '@carbon/react/lib/components/Checkbox/Checkbox';

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
                        <TextBoxCustom
                            labelText={t('name')}
                            placeholderText={t('name-placeholder')}
                            autocomplete='given-name'
                            name='name'
                            onChange={setValue}
                        />
                    </Col>
                    <Col lg={16} md={8} sm={4} xs={4}>
                        <TextBoxCustom
                            labelText={t('email')}
                            autocomplete='email'
                            name='email'
                            onChange={setValue}
                        />
                    </Col>
                    <Col lg={16} md={8} sm={4} xs={4}>
                        <TextBoxCustom
                            labelText={t('phone')}
                            placeholderText={t('phone-placeholder')}
                            autocomplete='tel'
                            name='phone'
                            onChange={setValue}
                        />
                    </Col>
                    <Col lg={16} md={8} sm={4} xs={4}>
                        <TextAreaCustom
                            className='message'
                            labelText={t('message')}
                            placeholder={t('message-placeholder')}
                            enableCounter
                            maxCount={100}
                            name='message'
                            onChange={setValue}
                        />
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
                        <ButtonCustom action={() => onSubmit(data)} className='submit' text={t('submit')}/>
                    </Col>
                </Grid>
            </Col>
            <Col lg={6} md={3} sm={4} xs={4} className='right'>
                <img className='logo' src={Logo} alt='Emays Logo'/>
                <div className='email'>
                    <img src={EmailIcon} alt='E-Mail'/>
                    <div>
                        <span className='title'>{t('email-2')}</span>
                        <span>{t('email-2-value')}</span>
                    </div>
                </div>
                <div className='phone'>
                    <img src={PhoneIcon} alt='Phone Number'/>
                    <div>
                        <span className='title'>{t('phone-2')}</span>
                        <span>{t('phone-2-value')}</span>
                    </div>
                </div>
                <div className='social'>
                    <a href=''>
                        <img src={InstagramIcon} alt='Instagram'/>
                    </a>
                    <a href=''>
                        <img src={LinkedInIcon} alt='LinkedIn'/>
                    </a>
                    <a href=''>
                        <img src={FacebookIcon} alt='Facebook'/>
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
