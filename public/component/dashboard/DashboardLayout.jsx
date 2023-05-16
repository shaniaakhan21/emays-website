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
                <div className='dashboard-nav-section'>
                    <nav>
                        <ul>
                            <li className={'nav-link'}>
                                <Link to='/dashboard/overview'>
                                    {t('dashboard.navigation.overview')}
                                </Link>
                            </li>
                            <li className={'nav-link'}>
                                <Link to='/dashboard/deliveryOrders'>
                                    {t('dashboard.navigation.del-orders')}
                                </Link>
                            </li>
                            <li className={'nav-link'}>
                                <Link to='/dashboard/customers'>
                                    {t('dashboard.navigation.customers')}
                                </Link>
                            </li>
                            <li className={'nav-link'}>
                                <Link to='/dashboard/history'>
                                    {t('dashboard.navigation.history')}
                                </Link>
                            </li>
                            <li className={'nav-link'}>
                                <Link to='/dashboard/newOrders'>
                                    {t('dashboard.navigation.new-orders')}
                                </Link>
                            </li>
                            <li className={'nav-link'}>
                                <Link to='/dashboard/adminTools'>
                                    {t('dashboard.navigation.adminTools')}
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className='content-section'>
                    <Switch>
                        <Route exact path='/dashboard/overview'
                            component={() => <Overview />}></Route>
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
                            component={() => <Overview/>}></Route>
                    </Switch>
                </div>
            </div>
        </Router>
    );
};

export default React.memo(DashboardLayout);
