import React, { useCallback, useState } from 'react';
import { Header, HeaderName, HeaderNavigation, HeaderMenuItem, Toggle } from '@carbon/react';
import '../../scss/component/customer/navbar.scss';
import LOGO from '../../logo/EMAYS.svg'; 
import ICON from '../../icons/NAVICON.svg';
import { useTranslation } from 'react-i18next';
import useSessionState from '../../js/util/useSessionState';
import PropTypes from 'prop-types';

const Nav = () => {
    const [t] = useTranslation();
    const [isRetailer, setIsRetailer] = useSessionState('uiState', false);
    const [showMenu, setShowMenu] = useState(false);
    const handleToggleChange = useCallback(() => {
        setIsRetailer((prevIsRetailer) => !prevIsRetailer);
        if (isRetailer) {
            window.location.href = '#/';
        } else {
            window.location.href = '#/retailer';
        }
    }, [isRetailer]);

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
                    <HeaderMenuItem
                        href='/#/retailer'
                        onClick={() => {
                            const elem = document.querySelector( '#integration-start' );
                            elem.scrollIntoView({ behavior: 'smooth' });
                        }}
                        style={{ marginLeft: '1rem' }}
                    >
                        {t('nav.menu.integration')}
                    </HeaderMenuItem>
                    <HeaderMenuItem
                        href='/#/retailer'
                        onClick={() => {
                            const elem = document.querySelector( '#faqs-start' );
                            elem.scrollIntoView({ behavior: 'smooth' });
                        }}
                    >{t('nav.menu.faqs')}</HeaderMenuItem>
                    <HeaderMenuItem
                        href='/#/retailer'
                        onClick={() => {
                            const elem = document.querySelector( '#sustainability-start' );
                            elem.scrollIntoView({ behavior: 'smooth' });
                        }}
                    >{t('nav.menu.sustainability')}</HeaderMenuItem>
                    <HeaderMenuItem
                        href='/#/retailer'
                        onClick={() => {
                            const elem = document.querySelector( '#partnership-start' );
                            elem.scrollIntoView({ behavior: 'smooth' });
                        }}
                    >{t('nav.menu.partnership')}</HeaderMenuItem>
                    <HeaderMenuItem
                        href='/#/retailer'
                        onClick={() => {
                            const elem = document.querySelector( '#lets-talk-start' );
                            elem.scrollIntoView({ behavior: 'smooth' });
                        }}
                    >{t('nav.menu.lets-talk')}</HeaderMenuItem>
                </> : <>
                    <HeaderMenuItem
                        href='/#/'
                        onClick={() => {
                            const elem = document.querySelector( '#services-start' );
                            elem.scrollIntoView({ behavior: 'smooth' });
                        }}
                        style={{ marginLeft: '1rem' }}
                    >
                        {t('nav.menu.services')}
                    </HeaderMenuItem>
                    <HeaderMenuItem
                        href='/#/'
                        onClick={() => {
                            const elem = document.querySelector( '#sustainability-start' );
                            elem.scrollIntoView({ behavior: 'smooth' });
                        }}
                    >{t('nav.menu.sustainability')}
                    </HeaderMenuItem>
                    <HeaderMenuItem
                        href='/#/'
                        onClick={() => {
                            const elem = document.querySelector( '#shop-with-us-start' );
                            elem.scrollIntoView({ behavior: 'smooth' });
                        }}
                    >{t('nav.menu.shop-with-us')}</HeaderMenuItem>
                    <HeaderMenuItem
                        href='/#/'
                        onClick={() => {
                            const elem = document.querySelector( '#lets-talk-start' );
                            elem.scrollIntoView({ behavior: 'smooth' });
                        }}
                    >{t('nav.menu.lets-talk')}</HeaderMenuItem>
                    <HeaderMenuItem
                        href='/#/'
                        onClick={() => {
                            const elem = document.querySelector( '#faqs-start' );
                            elem.scrollIntoView({ behavior: 'smooth' });
                        }}
                    >{t('nav.menu.faqs')}</HeaderMenuItem>

                </>}
            </HeaderNavigation>
        </Header>
    );
};

Nav.prototype = {

};

export default Nav;
