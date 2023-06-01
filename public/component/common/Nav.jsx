import React, { useCallback, useState } from 'react';
import { Header, HeaderName, HeaderNavigation, HeaderMenuItem, Toggle } from '@carbon/react';
import '../../scss/component/customer/navbar.scss';
import LOGO from '../../logo/EMAYS.svg';
import LOGO_XS from '../../images/logo-xs.svg';
import ICON from '../../images/burger-menu.svg';
import { useTranslation } from 'react-i18next';
import useSessionState from '../../js/util/useSessionState';
import ButtonCustom from './ButtonCustom';

const Nav = () => {
    const { t, i18n } = useTranslation();
    const [isRetailer, setIsRetailer] = useSessionState('uiState', false);
    const [showMenu, setShowMenu] = useState(false);

    const handleToggleChange = useCallback(() => {
        setIsRetailer((prevIsRetailer) => !prevIsRetailer);
        if (isRetailer) {
            window.location.href = '/';
        } else {
            window.location.href = '/retailer';
        }
    }, [isRetailer]);

    const getLanguage = () => i18n.language;

    const handleToggleLanguage = useCallback(() => {
        i18n.changeLanguage(getLanguage() === 'it' ? 'en' : 'it');
    }, []);

    const handleMenuClick = () => {
        setShowMenu(!showMenu);
    };

    return (
        <div className='cds--wrapper'>
            <Header aria-label='EMAY'>
                <HeaderName href={isRetailer ? '/retailer' : '/'} prefix='' className='header-name'>
                    <img src={LOGO} alt='EMAYS' style={{ marginRight: '1rem' }} className='logo' />
                    <img src={LOGO_XS} alt='EMAYS' style={{ marginRight: '1rem' }} className='logo-xs' />
                </HeaderName>
                <div className='cus-retailer-toggle'>
                    <ButtonCustom
                        action={handleToggleChange}
                        text={t('common.nav-customers')}
                        className={`cus-ratailer-toggle__customer${isRetailer ? '' : ' active'}`}
                    />
                    <ButtonCustom
                        action={handleToggleChange}
                        text={t('common.nav-retailers')}
                        className={`cus-ratailer-toggle__retailer${isRetailer ? ' active' : ''}`}
                    />
                </div>
                <HeaderNavigation aria-label='Your Company' className={showMenu ? 'show-menu' : ''}>
                    {isRetailer ? <>
                        <HeaderMenuItem href='/integration' style={{ marginLeft: '1rem' }}>
                            {t('nav.menu.integration')}
                        </HeaderMenuItem>
                        <HeaderMenuItem href='/environment'>{t('nav.menu.sustainability')}</HeaderMenuItem>
                        <HeaderMenuItem href='/letsTalk'>{t('nav.menu.lets-talk')}</HeaderMenuItem>
                    </> : <>
                        <HeaderMenuItem
                            href='/#/environment'
                        >{t('nav.menu.sustainability')}
                        </HeaderMenuItem>
                        <HeaderMenuItem
                            href='/#/'
                            onClick={() => {
                                const elem = document.querySelector( '#shop-with-us-start' );
                                elem?.scrollIntoView?.({ behavior: 'smooth' });
                            }}
                        >{t('nav.menu.shop-with-us')}</HeaderMenuItem>
                        <HeaderMenuItem
                            href='/letsTalk'
                        >{t('nav.menu.lets-talk')}</HeaderMenuItem>
                        <HeaderMenuItem
                            href='/faq'
                        >{t('nav.menu.faqs')}</HeaderMenuItem>

                    </>}
                </HeaderNavigation>
                <Toggle
                    aria-label='Retailer toggle'
                    id='retailer-toggle'
                    labelText={getLanguage() === 'en' ? 'IT' : 'EN'}
                    toggled={getLanguage() === 'it'}
                    onToggle={handleToggleLanguage}
                    className='retailer-toggle'
                />
                <img src={ICON} alt='Nav icon' className='nav-icon' onClick={handleMenuClick}/>
            </Header>
        </div>
    );
};

Nav.prototype = {

};

export default Nav;
