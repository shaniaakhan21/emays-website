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
                        <Link href='#'>{t('privacy')}</Link>
                    </div>
                </Column>
                <Column sm={8} md={6} lg={2}>
                    <div className='footer__links contact'>
                        <Link href='#'>{t('contact')}</Link>
                    </div>
                    <div className='footer__links'>
                        <span>{t('copy')}</span>
                    </div>
                </Column>
                <Column sm={12} md={3} lg={8} className='footer__right'>
                    <div className='footer__social'>
                        <Link href='#'>
                            <img src={TrustPilot} alt='TrustPilot' />
                            {t('trustpilot')}
                        </Link>
                        <Link href='#'>
                            <img src={Instagram} alt='Instagram' />
                            {t('instagram')}
                        </Link>
                        <Link href='#'>
                            <img src={Facebook} alt='Facebook' />
                            {t('facebook')}
                        </Link>
                    </div>
                </Column>
            </Grid>
        </Column>
    );
};

export default Footer;
