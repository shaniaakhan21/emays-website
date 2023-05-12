
import React, { useEffect } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

// SCSS
import '../scss/main.scss';

// Components
import ErrorBoundary from './ErrorBoundary';
import Checkout from './checkout/Checkout';
import Confirm from './checkout/Confirm';
import Appointment from './appointment/AppointmentDetails';
import CustomerRouter from './customer/Router';
import RetailerRouter from './retailer/Router';
import { MessageProvider } from './common/messageCtx';

// Util

const MainRouter = () => {

    return (<main className='main-container' role='main'>
        <ErrorBoundary>
            <MessageProvider>
                <Router>
                    <Switch>
                        <Route path='/confirm' component={() => <Confirm />}></Route>
                        <Route path='/checkout' component={() => <Checkout />}></Route>
                        <Route path='/appointment' component={() => <Appointment/>}></Route>
                        <Route path='/retailer' component={() => <RetailerRouter />} />
                        {/* This component will act as a relocate router based on the initial launch type */}
                        <Route path='/' component={() => <CustomerRouter />} />
                    </Switch>
                </Router>
            </MessageProvider>
        </ErrorBoundary>
    </main>);
};

export default MainRouter;
