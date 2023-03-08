import React from 'react';
// eslint-disable-next-line max-len
import { Header, HeaderMenuButton, HeaderName, HeaderNavigation, HeaderGlobalAction, HeaderMenuItem } from '@carbon/react';
import '../../scss/component/customer/navbar.scss';
import LOGO from '../../logo/EMAYS.svg'; 
import ICON from '../../icons/NAVICON.svg';

const Nav = () => {
    return (
        <Header aria-label='EMAY'>
            <HeaderMenuButton aria-label='Open menu' />
            <HeaderName prefix='' className='header-name'>
                <img src={LOGO} alt='EMAYS' style={{ marginRight: '1rem' }} />
            </HeaderName>
            <HeaderNavigation aria-label='Your Company'>
                <HeaderMenuItem href='#' style={{ marginLeft: '1rem' }}>INTEGRATION</HeaderMenuItem>
                <HeaderMenuItem href='#'>FAQS</HeaderMenuItem>
                <HeaderMenuItem href='#'>SUSTAINABILITY</HeaderMenuItem>
                <HeaderMenuItem href='#'>PARTNERSHIP</HeaderMenuItem>
                <HeaderMenuItem href='#'>Let's Talk</HeaderMenuItem>
                <HeaderMenuItem href='#'>
                    <div className='icon-box'>
                        <img src={ICON}/>
                    </div>
                </HeaderMenuItem>
            </HeaderNavigation>
        </Header>
    );
};

export default Nav;

