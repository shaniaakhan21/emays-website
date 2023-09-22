import React, { useCallback, useEffect } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Customer from './customer/Customer';
import Overview from './overview/Overview';
import NewOrder from './newOrder/NewOrder';
import History from './history/History';
import '../../scss/component/dashboard/dashboardLayout.scss';
import DeliveryOrder from './deliveryOrder/DeliveryOrder';
import { useTranslation } from 'react-i18next';
import OrderCreated from './orderCreated/OrderCreated';
import PaginationContainer from '../common/PaginationContainer';
import AdminToolsRouter from './adminTools/AdminToolsRouter';
import { Notification, View, ListDropdown
    , EventsAlt, ServerTime } from '@carbon/icons-react';
import { useDispatch } from 'react-redux';
import { getOverviewData } from './redux/thunk/overviewThunk';
import { HeaderContainer, SideNav, SideNavItems, SideNavLink
} from '@carbon/react';

const DashboardLayout = () => {

    const [t] = useTranslation();

    const dispatch = useDispatch();

    const getActiveLinkStyle = (event) => {
        const anchorElements = document.querySelectorAll('nav ul li a');
        anchorElements.forEach(li => li.classList.remove('active'));
        event.target.closest('a').classList.add('active');
    };

    useEffect(() => {
        console.log('DASHBOARD LAYOUT---');
        const UL = document.querySelector('nav ul');
        UL.addEventListener('click', getActiveLinkStyle);
        return () => UL.removeEventListener('click', getComputedStyle);
    }, []);

    // Overview props
    const getOverviewDataWrapper = useCallback(() => { 
        const data = { pageNumber: 1, pageLimit: 2 };
        dispatch(getOverviewData(data));
    }, [dispatch]);

    return (
        <Router>
            <div className='dashboard-template'>
                <HeaderContainer
                    render={({ isSideNavExpanded, onClickSideNavExpand }) => (
                        <>
                            <SideNav
                                className='dash-side-nav'
                                aria-label='Side navigation'
                                isRail
                                expanded={isSideNavExpanded}
                                onOverlayClick={onClickSideNavExpand}
                                href='#main-content'
                                onSideNavBlur={onClickSideNavExpand}>
                                <SideNavItems>
                                    <SideNavLink
                                        renderIcon={View}
                                        href='/#/dashboard/overview'>
                                        Overview
                                    </SideNavLink>
                                    <SideNavLink
                                        renderIcon={ListDropdown}
                                        href='/#/dashboard/deliveryOrders'>
                                        Delivery Order
                                    </SideNavLink>
                                    <SideNavLink
                                        renderIcon={EventsAlt}
                                        href='/#/dashboard/customers'>
                                        Customers
                                    </SideNavLink>
                                    <SideNavLink
                                        renderIcon={ServerTime}
                                        href='/#/dashboard/history'>
                                        History
                                    </SideNavLink>
                                    <SideNavLink
                                        renderIcon={Notification}
                                        href='/#/dashboard/newOrders'>
                                        New Orders
                                    </SideNavLink>
                                </SideNavItems>
                            </SideNav>
                        </>
                    )}
                />
                <div className='content-section'>
                    <Switch>
                        <Route exact path='/dashboard/overview'
                            component={() => <PaginationContainer
                                fullLength={10}
                                wrapperStyle={{}}
                                // The method used for fetch data
                                getData={getOverviewDataWrapper}
                                // The property name of the overview component
                                resourceName={'overviewData'}
                            >
                                <Overview />
                            </PaginationContainer>
                            }></Route>
                        <Route exact path='/dashboard/overview'
                            component={() => <Overview />
                            }></Route>
                        <Route exact path='/dashboard/deliveryOrders'
                            component={() => <DeliveryOrder />}></Route>
                        <Route exact path='/dashboard/orders/:id/created'
                            component={() => <OrderCreated />}></Route>
                        <Route exact path='/dashboard/customers'
                            component={() => <Customer />}></Route>
                        <Route exact path='/dashboard/history'
                            component={() => <History />}></Route>
                        <Route exact path='/dashboard/newOrders'
                            component={() => <NewOrder />}></Route>
                        <Route path='/dashboard/adminTools'
                            component={() => <AdminToolsRouter />}></Route>
                        <Route path='/dashboard/'
                            component={() => <Overview />}></Route>
                    </Switch>
                </div>
            </div>
        </Router>
    );
};

export default React.memo(DashboardLayout);
