import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useLocation } from 'react-router-dom';
import Customer from './customer/Customer';
import Overview from './overview/Overview';
import NewOrder from './newOrder/NewOrder';
import History from './history/History';
import '../../scss/component/dashboard/dashboardLayout.scss';
import DeliveryOrder from './deliveryOrder/DeliveryOrder';
import { useTranslation } from 'react-i18next';

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
                                    <Link to='/dashboard/overview'>{t('dashboard.navigation.overview')}</Link>
                                </li>
                                <li className={'nav-link'}>
                                    <Link to='/dashboard/deliveryOrders'>{t('dashboard.navigation.del-orders')}</Link>
                                </li>
                                <li className={'nav-link'}>
                                    <Link to='/dashboard/customers'>{t('dashboard.navigation.customers')}</Link>
                                </li>
                                <li className={'nav-link'}>
                                    <Link to='/dashboard/history'>{t('dashboard.navigation.history')}</Link>
                                </li>
                                <li className={'nav-link'}>
                                    <Link to='/dashboard/newOrders'>{t('dashboard.navigation.new-orders')}</Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className='cds--col-md-10 content-section'>
                        <Switch>
                            <Route exact path='/dashboard/overview' 
                                component={() => <Overview />}></Route>
                            <Route exact path='/dashboard/deliveryOrders' 
                                component={() => <DeliveryOrder />}></Route>
                            <Route exact path='/dashboard/customers' 
                                component={() => <Customer />}></Route>
                            <Route exact path='/dashboard/history' 
                                component={() => <History />}></Route>
                            <Route exact path='/dashboard/newOrders' 
                                component={() => <NewOrder />}></Route>
                            <Route path='/' 
                                component={() => <Overview />}></Route>
                        </Switch>
                    </div>
                </div>
            </div>
        </Router>
    );
};

export default React.memo(DashboardLayout);
