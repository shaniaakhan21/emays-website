import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useLocation } from 'react-router-dom';
import Customer from './customer/Customer';
import Overview from './overview/Overview';
import '../../scss/component/dashboard/dashboardLayout.scss';

const DashboardLayout = () => {

    const location = useLocation();

    const getActiveLinkStyle = (path) => {
        return path === location.pathname ? 'active' : '';
    };

    return (
        <Router>
            <div className='cds--grid'>
                <div className='cds--row'>
                    <div className='cds--col-md-1'>
                        <nav>
                            <ul>
                                <li className={`nav-link ${getActiveLinkStyle('/dashboard/overview')}`}>
                                    <Link to='/dashboard/overview'>Overview</Link>
                                </li>
                                <li className={`nav-link ${getActiveLinkStyle('/dashboard/overview')}`}>
                                    <Link to='/dashboard/customer'>Contact</Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className='cds--col-md-11'>
                        <Switch>
                            <Route exact path='/dashboard/overview' 
                                component={() => <Overview />}></Route>
                            <Route exact path='/dashboard/customer' 
                                component={() => <Customer />}></Route>
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
