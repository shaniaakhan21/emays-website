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
            <div className='cds--grid'>
                <div className='cds--row'>
                    <div className='cds--col-md-2 nav-section'>
                        <nav>
                            <ul>
                                <li className={'nav-link'}>
                                    <Link to='/retailer/dashboard/overview'>
                                        {t('dashboard.navigation.overview')}
                                    </Link>
                                </li>
                                <li className={'nav-link'}>
                                    <Link to='/retailer/dashboard/deliveryOrders'>
                                        {t('dashboard.navigation.del-orders')}
                                    </Link>
                                </li>
                                <li className={'nav-link'}>
                                    <Link to='/retailer/dashboard/customers'>
                                        {t('dashboard.navigation.customers')}
                                    </Link>
                                </li>
                                <li className={'nav-link'}>
                                    <Link to='/retailer/dashboard/history'>
                                        {t('dashboard.navigation.history')}
                                    </Link>
                                </li>
                                <li className={'nav-link'}>
                                    <Link to='/retailer/dashboard/newOrders'>
                                        {t('dashboard.navigation.new-orders')}
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className='cds--col-md-10 content-section'>
                        <Switch>
                            <Route exact path='/retailer/dashboard/overview'
                                component={() => <Overview />}></Route>
                            <Route exact path='/retailer/dashboard/deliveryOrders'
                                component={() => <DeliveryOrder />}></Route>
                            <Route exact path='/retailer/dashboard/orders/:id/created'
                                component={() => <OrderCreated />}></Route>
                            <Route exact path='/retailer/dashboard/customers'
                                component={() => <Customer />}></Route>
                            <Route exact path='/retailer/dashboard/history'
                                component={() => <History />}></Route>
                            <Route exact path='/retailer/dashboard/newOrders'
                                component={() => <NewOrder />}></Route>
                            <Route path='/retailer/dashboard/'
                                component={() => <Overview/>}></Route>
                        </Switch>
                    </div>
                </div>
            </div>
        </Router>
    );
};

export default React.memo(DashboardLayout);