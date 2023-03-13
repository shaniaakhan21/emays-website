import React, { useState } from 'react';
import { Header, HeaderName, HeaderNavigation, HeaderMenuItem, Toggle } from '@carbon/react';
import '../../scss/component/customer/navbar.scss';
import LOGO from '../../logo/EMAYS.svg'; 
import ICON from '../../icons/NAVICON.svg';
import { useTranslation } from 'react-i18next';

const Nav = () => {
    const [t] = useTranslation();
    const [isRetailer, setIsRetailer] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    const handleToggleChange = () => {
        setIsRetailer(!isRetailer);
    };

    const handleMenuClick = () => {
        setShowMenu(!showMenu);
    };

    return (
        <Header aria-label='EMAY'>
            <HeaderName href='/customer' prefix='' className='header-name'>
                <img src={LOGO} alt='EMAYS' style={{ marginRight: '1rem' }} />
            </HeaderName>
            <Toggle
                aria-label='Retailer toggle'
                id='retailer-toggle'
                labelText={isRetailer ? t('nav.toggle-label.retailer') : t('nav.toggle-label.customer')}
                defaultToggled={!isRetailer}
                onToggle={handleToggleChange}
                className='retailer-toggle'
            />
            <img src={ICON} alt='Nav icon' className='nav-icon' onClick={handleMenuClick}/>
            <HeaderNavigation aria-label='Your Company' className={showMenu ? 'show-menu' : ''}>
                <HeaderMenuItem href='/customer/services' style={{ marginLeft: '1rem' }}>
                    {t('nav.menu.services')}
                </HeaderMenuItem>
                <HeaderMenuItem href='/customer/environment'>{t('nav.menu.sustainability')}</HeaderMenuItem>
                <HeaderMenuItem href='/customer/shop-with-us'>{t('nav.menu.shop-with-us')}</HeaderMenuItem>
                <HeaderMenuItem href='#'>{t('nav.menu.lets-talk')}</HeaderMenuItem>
                <HeaderMenuItem href='#'>{t('nav.menu.faqs')}</HeaderMenuItem>
            </HeaderNavigation>
        </Header>
    );
};

export default Nav;
