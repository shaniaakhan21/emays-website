import React, { useCallback, useState } from 'react';
import { Header, HeaderName, HeaderNavigation, HeaderMenuItem, Toggle } from '@carbon/react';
import '../../scss/component/customer/navbar.scss';
import LOGO from '../../logo/EMAYS.svg'; 
import ICON from '../../icons/NAVICON.svg';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import useSessionState from '../../js/util/useSessionState';

const Nav = () => {
    const [t] = useTranslation();
    const [isRetailer, setIsRetailer] = useSessionState('uiState', false);
    const [showMenu, setShowMenu] = useState(false);
    const history = useHistory();

    const handleToggleChange = () => {
        setIsRetailer(cs => !cs);
    };

    const handleMenuClick = () => {
        setShowMenu(!showMenu);
    };

    return (
        <Header aria-label='EMAY'>
            <HeaderName href='/#/' prefix='' className='header-name'>
                <img src={LOGO} alt='EMAYS' style={{ marginRight: '1rem' }} />
            </HeaderName>
            <Toggle
                aria-label='Retailer toggle'
                id='retailer-toggle'
                labelText={isRetailer ? t('nav.toggle-label.retailer') : t('nav.toggle-label.customer')}
                toggled={isRetailer}
                onToggle={handleToggleChange}
                className='retailer-toggle'
            />
            <img src={ICON} alt='Nav icon' className='nav-icon' onClick={handleMenuClick}/>
            <HeaderNavigation aria-label='Your Company' className={showMenu ? 'show-menu' : ''}>
                {isRetailer ? <>
                    <HeaderMenuItem href='/#/integration' style={{ marginLeft: '1rem' }}>
                        {t('nav.menu.integration')}
                    </HeaderMenuItem>
                    <HeaderMenuItem href='/#/faq'>{t('nav.menu.faqs')}</HeaderMenuItem>
                    <HeaderMenuItem href='/#/environment'>{t('nav.menu.sustainability')}</HeaderMenuItem>
                    <HeaderMenuItem href='/#/partnership'>{t('nav.menu.partnership')}</HeaderMenuItem>
                    <HeaderMenuItem href='/#/letsTalk'>{t('nav.menu.lets-talk')}</HeaderMenuItem>
                </> : <>
                    <HeaderMenuItem href='/#/services' style={{ marginLeft: '1rem' }}>
                        {t('nav.menu.services')}
                    </HeaderMenuItem>
                    <HeaderMenuItem href='/#/environment'>{t('nav.menu.sustainability')}</HeaderMenuItem>
                    <HeaderMenuItem href='/#/shop-with-us'>{t('nav.menu.shop-with-us')}</HeaderMenuItem>
                    <HeaderMenuItem href='/#/letsTalk'>{t('nav.menu.lets-talk')}</HeaderMenuItem>
                    <HeaderMenuItem href='/#/faq'>{t('nav.menu.faqs')}</HeaderMenuItem>
                </>}
            </HeaderNavigation>
        </Header>
    );
};

export default Nav;
