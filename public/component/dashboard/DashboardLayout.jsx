import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Switch, Route, Link, useLocation } from 'react-router-dom';
import Customer from './customer/Customer';
import Overview from './overview/Overview';
import NewOrder from './newOrder/NewOrder';
import History from './history/History';
import '../../scss/component/dashboard/dashboardLayout.scss';
import DeliveryOrder from './deliveryOrder/DeliveryOrder';
import { useTranslation } from 'react-i18next';
import OrderCreated from './orderCreated/OrderCreated';
import AdminToolsRouter from './adminTools/AdminToolsRouter';
import { Grid, UserAdmin, Money, UpdateNow, Taxi, ShoppingCartPlus } from '@carbon/icons-react';
import {
    Header,
    HeaderContainer, HeaderGlobalAction, HeaderGlobalBar, HeaderMenu,
    HeaderMenuButton, HeaderMenuItem,
    HeaderName, HeaderNavigation,
    SideNav, SideNavItems, SideNavLink, SideNavMenu, SideNavMenuItem,
    SkipToContent
} from '@carbon/react';
import { Fade, Switcher, Search } from '@carbon/icons-react';

const DashboardLayout = () => {

    const [t] = useTranslation();

    const getActiveLinkStyle = (event) => {
        const anchorElements = document.querySelectorAll('nav ul li a');
        anchorElements.forEach(li => li.classList.remove('active'));
        event.target.closest('a').classList.add('active');
    };

    useEffect(() => {
        const UL = document.querySelector('nav ul');
        UL.addEventListener('click', getActiveLinkStyle);
        return () => UL.removeEventListener('click', getComputedStyle);
    }, []);

    return (
        <Router>
            <div className='dashboard-template'>
                <HeaderContainer
                    render={({ isSideNavExpanded, onClickSideNavExpand }) => (
                        <>
                            <Header aria-label='IBM Platform Name'>
                                <SkipToContent/>
                                <HeaderMenuButton
                                    aria-label={isSideNavExpanded ? 'Close menu' : 'Open menu'}
                                    isCollapsible
                                    onClick={onClickSideNavExpand}
                                    isActive={isSideNavExpanded}
                                />
                                <HeaderName href='#' prefix='IBM'>
                                    [Platform]
                                </HeaderName>
                                <HeaderNavigation aria-label='IBM [Platform]'>
                                    <HeaderMenuItem href='#'>Link 1</HeaderMenuItem>
                                    <HeaderMenuItem href='#'>Link 2</HeaderMenuItem>
                                    <HeaderMenuItem href='#'>Link 3</HeaderMenuItem>
                                    <HeaderMenu aria-label='Link 4' menuLinkName='Link 4'>
                                        <HeaderMenuItem href='#'>Sub-link 1</HeaderMenuItem>
                                        <HeaderMenuItem href='#'>Sub-link 2</HeaderMenuItem>
                                        <HeaderMenuItem href='#'>Sub-link 3</HeaderMenuItem>
                                    </HeaderMenu>
                                </HeaderNavigation>
                                <HeaderGlobalBar>
                                    <HeaderGlobalAction
                                        aria-label='Search'>
                                        <Search size={20}/>
                                    </HeaderGlobalAction>
                                    <HeaderGlobalAction
                                        aria-label='Notifications'>
                                        <Notification size={20}/>
                                    </HeaderGlobalAction>
                                    <HeaderGlobalAction
                                        aria-label='App Switcher'
                                        tooltipAlignment='end'>
                                        <Switcher size={20}/>
                                    </HeaderGlobalAction>
                                </HeaderGlobalBar>
                                <SideNav
                                    aria-label='Side navigation'
                                    isRail
                                    expanded={isSideNavExpanded}
                                    onOverlayClick={onClickSideNavExpand}
                                    href='#main-content'
                                    onSideNavBlur={onClickSideNavExpand}>
                                    <SideNavItems>
                                        <SideNavMenu renderIcon={Fade} title='Category title'>
                                            <SideNavMenuItem href='https://www.carbondesignsystem.com/'>
                                                Link
                                            </SideNavMenuItem>
                                            <SideNavMenuItem href='https://www.carbondesignsystem.com/'>
                                                Link
                                            </SideNavMenuItem>
                                            <SideNavMenuItem href='https://www.carbondesignsystem.com/'>
                                                Link
                                            </SideNavMenuItem>
                                        </SideNavMenu>
                                        <SideNavMenu renderIcon={Fade} title='Category title'>
                                            <SideNavMenuItem href='https://www.carbondesignsystem.com/'>
                                                Link
                                            </SideNavMenuItem>
                                            <SideNavMenuItem
                                                aria-current='page'
                                                href='https://www.carbondesignsystem.com/'>
                                                Link
                                            </SideNavMenuItem>
                                            <SideNavMenuItem href='https://www.carbondesignsystem.com/'>
                                                Link
                                            </SideNavMenuItem>
                                        </SideNavMenu>
                                        <SideNavMenu renderIcon={Fade} title='Category title'>
                                            <SideNavMenuItem href='https://www.carbondesignsystem.com/'>
                                                Link
                                            </SideNavMenuItem>
                                            <SideNavMenuItem href='https://www.carbondesignsystem.com/'>
                                                Link
                                            </SideNavMenuItem>
                                            <SideNavMenuItem href='https://www.carbondesignsystem.com/'>
                                                Link
                                            </SideNavMenuItem>
                                        </SideNavMenu>
                                        <SideNavLink
                                            renderIcon={Fade}
                                            href='https://www.carbondesignsystem.com/'>
                                            Link
                                        </SideNavLink>
                                        <SideNavLink
                                            renderIcon={Fade}
                                            href='https://www.carbondesignsystem.com/'>
                                            Link
                                        </SideNavLink>
                                    </SideNavItems>
                                </SideNav>
                            </Header>
                            <StoryContent/>
                        </>
                    )}
                />
                <div className='dashboard-nav-section'>
                    <nav>
                        <ul>
                            <li className={'nav-link'}>
                                <Link to='/dashboard/overview'>
                                    <span>
                                        {t('dashboard.navigation.overview')}
                                    </span>
                                    <Grid/>
                                </Link>
                            </li>
                            <li className={'nav-link'}>
                                <Link to='/dashboard/deliveryOrders'>
                                    <span>
                                        {t('dashboard.navigation.del-orders')}
                                    </span>
                                    <UpdateNow/>
                                </Link>
                            </li>
                            <li className={'nav-link'}>
                                <Link to='/dashboard/customers'>
                                    <span>
                                        {t('dashboard.navigation.customers')}
                                    </span>
                                    <Taxi/>
                                </Link>
                            </li>
                            <li className={'nav-link'}>
                                <Link to='/dashboard/history'>
                                    <span>
                                        {t('dashboard.navigation.history')}
                                    </span>
                                    <ShoppingCartPlus/>
                                </Link>
                            </li>
                            <li className={'nav-link'}>
                                <Link to='/dashboard/newOrders'>
                                    <span>
                                        {t('dashboard.navigation.new-orders')}
                                    </span>
                                    <Money/>
                                </Link>
                            </li>
                            <li className={'nav-link'}>
                                <Link to='/dashboard/adminTools'>
                                    <span>
                                        {t('dashboard.navigation.adminTools')}
                                    </span>
                                    <UserAdmin/>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className='content-section'>
                    <Switch>
                        <Route exact path='/dashboard/overview'
                            component={() => <Overview/>}></Route>
                        <Route exact path='/dashboard/deliveryOrders'
                            component={() => <DeliveryOrder/>}></Route>
                        <Route exact path='/dashboard/orders/:id/created'
                            component={() => <OrderCreated/>}></Route>
                        <Route exact path='/dashboard/customers'
                            component={() => <Customer/>}></Route>
                        <Route exact path='/dashboard/history'
                            component={() => <History/>}></Route>
                        <Route exact path='/dashboard/newOrders'
                            component={() => <NewOrder/>}></Route>
                        <Route path='/dashboard/adminTools'
                            component={() => <AdminToolsRouter/>}></Route>
                        <Route path='/dashboard/'
                            component={() => <Overview/>}></Route>
                    </Switch>
                </div>
            </div>
        </Router>
    );
};

export default DashboardLayout;
