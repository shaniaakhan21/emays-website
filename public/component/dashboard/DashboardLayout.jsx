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
    , EventsAlt, ServerTime, NewTab, OperationsField } from '@carbon/icons-react';
import { getAppInfoExe, getSystemInfoExe } from './redux/thunk/appInfoThunk';
import { useDispatch, useSelector } from 'react-redux';
import { getInCompleteOrderData } from './redux/thunk/inCompleteOrderThunk';
import { HeaderContainer, SideNav, SideNavItems, SideNavLink
} from '@carbon/react';
import { loginSelectorMemoized } from './redux/selector/loginSelector';
import { getCompletedOrderData } from './redux/thunk/completeOrderThunk';
import AddItems from './addItem/AddItems';

const DashboardLayout = () => {

    const [t] = useTranslation();

    const dispatch = useDispatch();

    const loginStatusStore = useSelector(loginSelectorMemoized);

    const getActiveLinkStyle = (event) => {
        const anchorElements = document.querySelectorAll('nav ul li a');
        anchorElements.forEach(li => li.classList.remove('active'));
        event.target.closest('a').classList.add('active');
    };

    useEffect(() => {
        const UL = document.querySelector('nav ul');
        UL.addEventListener('click', getActiveLinkStyle);
        dispatch(getSystemInfoExe());
        return () => UL.removeEventListener('click', getComputedStyle);
    }, []);

    // Delivery Order props
    const getInCompletedOrderDataWrapper = useCallback((pageNo, limit) => { 
        const data = { pageNumber: pageNo, pageLimit: limit };
        return dispatch(getInCompleteOrderData(data));
    }, [dispatch]);

    // History props
    const getCompletedOrderDataWrapper = useCallback((pageNo, limit) => { 
        const data = { pageNumber: pageNo, pageLimit: limit };
        return dispatch(getCompletedOrderData(data));
    }, [dispatch]);

    // New Order props
    const getNewOrderDataWrapper = useCallback(() => { 
        return dispatch(getAppInfoExe());
    }, [dispatch]);

    return (
        /**
         * IMPORTANT: Wrap all the components which directly loads inside the menu.
         */
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
                                    {/* <SideNavLink
                                        renderIcon={ListDropdown}
                                        href='/#/dashboard/deliveryOrders'>
                                        Delivery Order
                                    </SideNavLink>
                                    <SideNavLink
                                        renderIcon={EventsAlt}
                                        href='/#/dashboard/customers'>
                                        Customers
                                    </SideNavLink> */}
                                    <SideNavLink
                                        renderIcon={ServerTime}
                                        href='/#/dashboard/history'>
                                        History
                                    </SideNavLink>
                                    <SideNavLink
                                        renderIcon={NewTab}
                                        href='/#/dashboard/newOrders'>
                                        New Orders
                                    </SideNavLink>
                                    {
                                        loginStatusStore?.role === 'super' && <SideNavLink
                                            renderIcon={OperationsField}
                                            href='/#/dashboard/adminTools'>
                                        Admin Tools
                                        </SideNavLink>
                                    }
                                </SideNavItems>
                            </SideNav>
                        </>
                    )}
                />
                <div className='content-section'>
                    <Switch>
                        <Route exact path='/dashboard/overview'
                            component={() => <Overview />
                            }></Route>
                        <Route exact path='/dashboard/orders/created'
                            component={() => <OrderCreated />}></Route>
                        <Route exact path='/dashboard/customers'
                            component={() => <Customer />}></Route>
                        <Route exact path='/dashboard/addItems'
                            component={() => <AddItems />}></Route>
                        <Route exact path='/dashboard/deliveryOrders'
                            component={() => <PaginationContainer
                                wrapperStyle={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                // The method used for fetch pagination data
                                getPaginationData={getInCompletedOrderDataWrapper}
                                // The property name of the overview component
                                resourceName={'deliveryOrderData'}
                                // Enable pagination
                                isPaginationEnabled={true}
                            >
                                <DeliveryOrder />
                            </PaginationContainer>}></Route>
                        <Route exact path='/dashboard/history'
                            component={() => <PaginationContainer
                                wrapperStyle={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                // The method used for fetch pagination data
                                getPaginationData={getCompletedOrderDataWrapper}
                                // The property name of the overview component
                                resourceName={'historyData'}
                                // Enable pagination
                                isPaginationEnabled={true}
                            >
                                <History />
                            </PaginationContainer>}></Route>
                        <Route exact path='/dashboard/newOrders'
                            component={() => <PaginationContainer
                                wrapperStyle={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                // The method used for fetch data
                                getInitialData={getNewOrderDataWrapper}
                                // The property name of the overview component
                                resourceName={'newOrderData'}
                            >
                                <NewOrder />
                            </PaginationContainer>
                            }></Route>
                        <Route path='/dashboard/adminTools'
                            component={() => <PaginationContainer
                                wrapperStyle={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                // The method used for fetch pagination data
                                getPaginationData={getOverviewDataWrapper}
                                // The property name of the overview component
                                resourceName={'adminData'}
                                // Enable pagination
                                isPaginationEnabled={true}
                            >
                                <AdminToolsRouter />
                            </PaginationContainer>}></Route>
                        <Route path='/dashboard'
                            component={() => <Overview />}></Route>
                    </Switch>
                </div>
            </div>
        </Router>
    );
};

export default React.memo(DashboardLayout);
