import React from 'react';
import { Grid, Link } from '@carbon/react';
import { Row, Column } from '@carbon/react';
import LOGO from '../../logo/EMAYS.svg';
import TrustPilot from '../../icons/trustpilot.svg';
import Instagram from '../../icons/logo--instagram.svg';
import Facebook from '../../icons/logo--facebook.svg';
import '../../scss/component/customer/footer.scss';
import { useTranslation } from 'react-i18next';

const Footer = () => {
    const [translate] = useTranslation();

    const t = (key) => translate(`footer.${key}`);

    return (
        <Column lg={16} md={8} sm={4} xs={4} as='footer'>
            <Grid className='footer'>
                <Column sm={4} md={3} lg={2}>
                    <img src={LOGO} alt='EMAYS'className='footer__logo' />
                </Column>
                <Column sm={8} md={6} lg={2}>
                    <div className='footer__links terms'>
                        <Link href='#'>{t('terms')}</Link>
                    </div>
                    <div className='footer__links'>
                        <Link href='/#/privacy'>{t('privacy')}</Link>
                    </div>
                </Column>
                <Column sm={8} md={6} lg={2}>
                    <div className='footer__links contact'>
                        <Link href='/#/letsTalk'>{t('contact')}</Link>
                    </div>
                    <div className='footer__links'>
                        <span>{t('copy')}</span>
                    </div>
                </Column>
                <Column sm={12} md={3} lg={8} className='footer__right'>
                    <div className='footer__social'>
                        <Link href='https://www.trustpilot.com/review/emaysstyle.com'>
                            <img src={TrustPilot} alt={t('trustpilot')} />
                            {t('trustpilot')}
                        </Link>
                        <Link href='https://www.instagram.com/emaysstyle'>
                            <img src={Instagram} alt={t('instagram')} />
                            {t('instagram')}
                        </Link>
                        <Link href='https://www.facebook.com/Emaysstyle'>
                            <img src={Facebook} alt={t('facebook')} />
                            {t('facebook')}
                        </Link>
                    </div>
                </Column>
            </Grid>
        </Column>
    );
};

export default Footer;
