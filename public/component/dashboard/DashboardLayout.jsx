/* eslint-disable max-lines */
import React, { useCallback, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
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
import { getAppInfoExe, getSystemInfoExe } from './redux/thunk/appInfoThunk';
import { useDispatch, useSelector } from 'react-redux';
import { getInCompleteOrderData } from './redux/thunk/inCompleteOrderThunk';
import { HeaderContainer, SideNav, SideNavItems, SideNavLink
} from '@carbon/react';
import { loginSelectorMemoized } from './redux/selector/loginSelector';
import { getCompletedOrderData } from './redux/thunk/completeOrderThunk';
import AddItems from './addItem/AddItems';
import OrderSelected from './orderSelected/OrderSelected';
import { getHistoryStatsData } from './redux/thunk/historyStatsThunk';
import { getDeliveryOrderStatsData } from './redux/thunk/deliveryOrderStatsThunk';
import { getOverviewStatsData } from './redux/thunk/overviewStatsThunk';
import DriverDeliveryOrder from './adminTools/driver/DeliveryOrder';
import { DriverHistory } from './adminTools/driver/History';
import { UnAuthorized } from './adminTools/UnAuthorized';
import DriverOrderSelected from './orderSelected/DriverOrderSelected';
import DriverSelectItems from './orderSelected/DriverSelectItems';
import { getDriverHistoryData } from './redux/thunk/driverHistoryThunk';
import { LogoutFunc } from './login/Logout';
import { Payment } from './adminTools/driver/Payment';
import { MessageProvider } from '../common/messageCtx';
import EmaysLogo from '../../images/Dashboard/EMAYSLOGO.svg';
import { DashboardIconCustom, LogOutIconCustom, OrderDetailsIconCustom,
    TaskAddIconCustom, TimeIconCustom, ToolBoxCustom } from '../icons/CustomIcons';
import { appInfoSelectorMemoized } from './redux/selector/appInfoSelector';

const DashboardLayout = () => {

    const [t] = useTranslation();

    const dispatch = useDispatch();

    const loginStatusStore = useSelector(loginSelectorMemoized);
    const appInfoSelector = useSelector(appInfoSelectorMemoized);
    const loggedInUser = useSelector(loginSelectorMemoized);

    const getActiveLinkStyle = (event) => {
        const anchorElements = document.querySelectorAll('nav ul li a');
        anchorElements.forEach(li => li.classList.remove('active'));
        event.target.closest('a').classList.add('active');
    };

    useEffect(() => {

        const UL = document.querySelector('nav ul');
        UL.addEventListener('click', getActiveLinkStyle);
        if (loggedInUser?.isSuccess && appInfoSelector?.systemInfoState?.isLoading) {
            dispatch(getSystemInfoExe());
        }
        return () => UL.removeEventListener('click', getActiveLinkStyle);
    }, []);

    // Delivery Order props
    const getInCompletedOrderDataWrapper = useCallback((pageNo, limit) => { 
        const data = { pageNumber: pageNo, pageLimit: limit };
        return dispatch(getInCompleteOrderData(data));
    }, [dispatch]);
    const getInitialDataDeliveryOrder = useCallback(() => {
        return dispatch(getDeliveryOrderStatsData());
    }, [dispatch]);

    // History props
    const getCompletedOrderDataWrapper = useCallback((pageNo, limit) => { 
        const data = { pageNumber: pageNo, pageLimit: limit };
        return dispatch(getCompletedOrderData(data));
    }, [dispatch]);
    const getInitialDataHistory = useCallback(() => {
        return dispatch(getHistoryStatsData());
    }, [dispatch]);

    // New Order props
    const getNewOrderDataWrapper = useCallback(() => { 
        return dispatch(getAppInfoExe());
    }, [dispatch]);
    const getInitialDataOverview = useCallback(() => {
        return dispatch(getOverviewStatsData({ durationType: 1 }));
    }, [dispatch]);
    
    // History driver
    const getDriverHistoryDataWrapper = useCallback((pageNo, limit) => { 
        const data = { pageNumber: pageNo, pageLimit: limit, driverId: loginStatusStore?.userInfo?.id };
        return dispatch(getDriverHistoryData(data));
    }, [dispatch]);

    return (
        /**
         * IMPORTANT: Wrap all the components which directly loads inside the menu.
         */
        <MessageProvider>
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
                                <div className='nav-image'>
                                    <img src={EmaysLogo}/>
                                </div>
                                <SideNavItems>

                                    {/* OVERVIEW */}
                                    {
                                        (loginStatusStore?.role === 'super' || 
                                        loginStatusStore?.role === 'admin' || 
                                        loginStatusStore?.role === 'manager' || 
                                        loginStatusStore?.role === 'external_system') && <SideNavLink
                                            renderIcon={DashboardIconCustom}
                                            href='/dashboard#/overview'>
                                        Overview
                                        </SideNavLink>
                                    }

                                    {/* DELIVERY ORDER */}
                                    {
                                        (loginStatusStore?.role === 'super' ||
                                        loginStatusStore?.role === 'admin' || 
                                        loginStatusStore?.role === 'manager' || 
                                        loginStatusStore?.role === 'external_system') && <SideNavLink
                                            renderIcon={OrderDetailsIconCustom}
                                            href='/dashboard#/deliveryOrders'>
                                        Delivery Orders
                                        </SideNavLink>
                                    }
                                    
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

                                    {/* NEW ORDER */}
                                    {
                                        (loginStatusStore?.role === 'super' || 
                                        loginStatusStore?.role === 'admin' || 
                                        loginStatusStore?.role === 'manager' || 
                                        loginStatusStore?.role === 'external_system') && <SideNavLink
                                            renderIcon={TaskAddIconCustom}
                                            href='/dashboard#/newOrders'>
                                        Add New Order
                                        </SideNavLink>
                                    }

                                    {/* HISTORY */}
                                    {
                                        (loginStatusStore?.role === 'super' || 
                                        loginStatusStore?.role === 'admin' || 
                                        loginStatusStore?.role === 'manager' || 
                                        loginStatusStore?.role === 'external_system') && <SideNavLink
                                            renderIcon={TimeIconCustom}
                                            href='/dashboard#/history'>
                                        Order History
                                        </SideNavLink>
                                    }

                                    {/* ADMIN TOOLS */}
                                    {
                                        (loginStatusStore?.role === 'super') && <SideNavLink
                                            renderIcon={ToolBoxCustom}
                                            href='/dashboard#/adminTools'>
                                        Admin Tools
                                        </SideNavLink>
                                    }

                                    {/* ----------- DRIVER ROUTES ----------- */}

                                    {
                                        loginStatusStore?.role === 'driver' && <SideNavLink
                                            renderIcon={OrderDetailsIconCustom}
                                            href='/dashboard#/driver/deliveryOrders'>
                                        Delivery Order
                                        </SideNavLink>
                                    }

                                    {
                                        loginStatusStore?.role === 'driver' && <SideNavLink
                                            renderIcon={TimeIconCustom}
                                            href='/dashboard#/driver/history'>
                                       Order History
                                        </SideNavLink>
                                    }

                                    {/* LOGOUT FOR ALL*/}
                                    {
                                        <SideNavLink
                                            className={'log-out'}
                                            renderIcon={LogOutIconCustom}
                                            href='/dashboard#/logout'>
                                        Logout
                                        </SideNavLink>
                                    }

                                </SideNavItems>
                            </SideNav>
                        </>
                    )}
                />
                <div className='content-section'>
                    <Routes>
                        {
                            <Route path='logout'
                                element={<LogoutFunc />}></Route>
                        }

                        {
                            (loginStatusStore?.role === 'super' || 
                            loginStatusStore?.role === 'admin' || 
                            loginStatusStore?.role === 'manager' || 
                                loginStatusStore?.role === 'external_system') && 
                                <Route exact path='overview'
                                    element={<PaginationContainer
                                        wrapperStyle={{ display: 'flex', alignItems: 'center',
                                            justifyContent: 'center', paddingTop: '50px' }}
                                        // The property name of the overview component
                                        resourceName={'overviewData'}
                                        // Enable pagination
                                        isPaginationEnabled={false}
                                        getInitialData={getInitialDataOverview}
                                    ><Overview /></PaginationContainer>
                                    }></Route>
                        }

                        {
                            (loginStatusStore?.role === 'super' || 
                            loginStatusStore?.role === 'admin' || 
                            loginStatusStore?.role === 'manager' || 
                                loginStatusStore?.role === 'external_system') &&  
                                <Route exact path='orders/created'
                                    element={<OrderCreated />}></Route>
                        }

                        {
                            (loginStatusStore?.role === 'super' || 
                            loginStatusStore?.role === 'admin' || 
                            loginStatusStore?.role === 'manager' || 
                                loginStatusStore?.role === 'external_system') && 
                                <Route exact path='customers'
                                    element={<Customer />}></Route>
                        }
                        
                        {
                            (loginStatusStore?.role === 'super' || 
                            loginStatusStore?.role === 'admin' || 
                            loginStatusStore?.role === 'manager' || 
                                loginStatusStore?.role === 'external_system') &&
                                <Route exact path='selectedOrder'
                                    element={<OrderSelected />}></Route>
                        }

                        {
                            (loginStatusStore?.role === 'super' || 
                            loginStatusStore?.role === 'admin' || 
                            loginStatusStore?.role === 'manager' || 
                                loginStatusStore?.role === 'external_system') && 
                                    <Route exact path='addItems'
                                        element={<AddItems />}></Route>
                        }
                        
                        {
                            (loginStatusStore?.role === 'super' || 
                             loginStatusStore?.role === 'admin' || 
                             loginStatusStore?.role === 'manager' || 
                             loginStatusStore?.role === 'external_system') && 
                                 <Route exact path='deliveryOrders'
                                     element={<PaginationContainer
                                         wrapperStyle={{ display: 'flex',
                                             alignItems: 'center', justifyContent: 'center', paddingTop: '50px' }}
                                         // The method used for fetch pagination data
                                         getPaginationData={getInCompletedOrderDataWrapper}
                                         // The property name of the overview component
                                         resourceName={'deliveryOrderData'}
                                         // Enable pagination
                                         pageLength={7}
                                         noOfVisibleButtons={5}
                                         isPaginationEnabled={true}
                                         getInitialData={getInitialDataDeliveryOrder}
                                     >
                                         <DeliveryOrder />
                                     </PaginationContainer>}></Route>
                        }
                        
                        {
                            (loginStatusStore?.role === 'super' || 
                            loginStatusStore?.role === 'admin' || 
                            loginStatusStore?.role === 'manager' || 
                                loginStatusStore?.role === 'external_system') && <Route path='history'
                                element={<PaginationContainer
                                    wrapperStyle={{ display: 'flex', alignItems: 'center',
                                        justifyContent: 'center', paddingTop: '50px' }}
                                    // The method used for fetch pagination data
                                    getPaginationData={getCompletedOrderDataWrapper}
                                    // The property name of the overview component
                                    resourceName={'historyData'}
                                    // Enable pagination
                                    isPaginationEnabled={true}
                                    pageLength={7}
                                    noOfVisibleButtons={5}
                                    getInitialData={getInitialDataHistory}
                                >
                                    <History />
                                </PaginationContainer>}></Route>
                        }
                    
                        {
                            (loginStatusStore?.role === 'super' || 
                            loginStatusStore?.role === 'admin' || 
                            loginStatusStore?.role === 'manager' || 
                                loginStatusStore?.role === 'external_system') && 
                                <Route path='newOrders'
                                    element={<PaginationContainer
                                        wrapperStyle={{ display: 'flex',
                                            alignItems: 'center', justifyContent: 'center', paddingTop: '50px' }}
                                        // The method used for fetch data
                                        getInitialData={getNewOrderDataWrapper}
                                        // The property name of the overview component
                                        resourceName={'newOrderData'}
                                    >
                                        <NewOrder />
                                    </PaginationContainer>
                                    }></Route>
                        }
                        
                        {
                            loginStatusStore?.role === 'super' &&
                                    <Route path='adminTools'
                                        element={<AdminToolsRouter />
                                        }></Route> 
                        }
                        
                        {
                            (loginStatusStore?.role === 'super' || 
                            loginStatusStore?.role === 'admin' || 
                            loginStatusStore?.role === 'manager' || 
                                loginStatusStore?.role === 'external_system') && 
                                <Route path='/' index
                                    element={<PaginationContainer
                                        wrapperStyle={{ display: 'flex', alignItems: 'center',
                                            justifyContent: 'center', paddingTop: '50px' }}
                                        // The property name of the overview component
                                        resourceName={'overviewData'}
                                        // Enable pagination
                                        isPaginationEnabled={false}
                                        getInitialData={getInitialDataOverview}
                                    ><Overview /></PaginationContainer>
                                    }></Route>
                        }

                        {/* ----------- DRIVER ROUTES ----------- */}

                        {
                            (loginStatusStore?.role === 'driver') && 
                            <Route exact path='driver/deliveryOrders'
                                element={<PaginationContainer
                                    wrapperStyle={{ display: 'flex',
                                        alignItems: 'center', justifyContent: 'center', paddingTop: '50px' }}
                                    // The method used for fetch pagination data
                                    getPaginationData={getInCompletedOrderDataWrapper}
                                    // The property name of the overview component
                                    resourceName={'driverDeliveryOrderData'}
                                    // Enable pagination
                                    isPaginationEnabled={true}
                                    pageLength={7}
                                    noOfVisibleButtons={5}
                                >
                                    <DriverDeliveryOrder />
                                </PaginationContainer>}></Route>
                        }
                        
                        {
                            (loginStatusStore?.role === 'driver') && 
                            <Route exact path='driver/history'
                                element={<PaginationContainer
                                    wrapperStyle={{ display: 'flex', alignItems: 'center',
                                        justifyContent: 'center', paddingTop: '50px' }}
                                    // The method used for fetch pagination data
                                    getPaginationData={getDriverHistoryDataWrapper}
                                    // The property name of the overview component
                                    resourceName={'historyData'}
                                    // Enable pagination
                                    isPaginationEnabled={true}
                                    pageLength={7}
                                    noOfVisibleButtons={5}
                                >
                                    <DriverHistory />
                                </PaginationContainer>}></Route>
                        }

                        {
                            (loginStatusStore?.role === 'driver') &&
                                <Route exact path='driverSelectedOrder'
                                    element={<DriverOrderSelected />}></Route>
                        }
                        
                        {
                            (loginStatusStore?.role === 'driver') &&
                                <Route exact path='driverSelectItems'
                                    element={<DriverSelectItems />}></Route>
                        }

                        {
                            (loginStatusStore?.role === 'driver') &&
                                <Route exact path='selectedOrder'
                                    element={<OrderSelected />}></Route>
                        }

                        {
                            (loginStatusStore?.role === 'driver') && 
                                <Route path='driver/payment'
                                    element={<Payment />}></Route>
                        }
                
                        {
                            (loginStatusStore?.role === 'driver') && 
                                <Route index path='/'
                                    element={<PaginationContainer
                                        wrapperStyle={{ display: 'flex',
                                            alignItems: 'center', justifyContent: 'center', paddingTop: '50px' }}
                                        // The method used for fetch pagination data
                                        getPaginationData={getInCompletedOrderDataWrapper}
                                        // The property name of the overview component
                                        resourceName={'driverDeliveryOrderData'}
                                        // Enable pagination
                                        isPaginationEnabled={true}
                                        pageLength={7}
                                        noOfVisibleButtons={5}
                                    >
                                        <DriverDeliveryOrder />
                                    </PaginationContainer>}></Route>
                        }

                        <Route path='/' index
                            element={<UnAuthorized />}></Route>
                    </Routes>
                </div>
            </div>
        </MessageProvider>
    );
};

export default React.memo(DashboardLayout);
