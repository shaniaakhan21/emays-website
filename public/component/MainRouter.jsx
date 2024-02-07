
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

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
import { DashboardContainer } from './dashboard/DashboardContainer';
import PaymentSuccessPage from './PaymentSuccess';
import ConnectStripeAccount from './ConnectStripeAccount';

// Util

const MainRouter = () => {

    const TEST = () => {
        return (<p>mail</p>);
    };

    return (<main className='main-container' role='main'>
        <p>Add test</p>
    </main>);
};

export default MainRouter;
