
import React, { useEffect } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

// SCSS
import '../scss/main.scss';

// Components
import ErrorBoundary from './ErrorBoundary';
import Checkout from './checkout/Checkout';
import Confirm from './checkout/Confirm';
import Appointment from './appointment/AppointmentDetails';
import Relocate from './Relocate';
import CustomerRouter from './customer/Router';
import RetailerRouter from './retailer/Router';

// Util

const MainRouter = () => {

    return (<main className='main-container' role='main'>
        <ErrorBoundary>
            <Router>
                <Switch>
                    <Route path='/confirm' component={() => <Confirm/>}></Route>
                    <Route path='/checkout' component={() => <Checkout />}></Route>
                    <Route path='/appointment' component={() => <Appointment/>}></Route>
                    <Route path='/retailer' component={() => <RetailerRouter />} />
                    <Route path='/' component={() => <CustomerRouter />} />
                    {/* This component will act as a relocate router based on the initial launch type */}
                    {/* <Route path='/' component={() => <Relocate/>}></Route> */}
                </Switch>

            </Router>
        </ErrorBoundary>
    </main>);
};

export default MainRouter;
