
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, HashRouter } from 'react-router-dom';

// SCSS
import '../scss/main.scss';

// Components
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

    const [key, setKey] = useState(0);

    useEffect(() => {
        window.addEventListener('hashchange', handleHashchange);
        return () => {
            window.removeEventListener('hashchange', handleHashchange);
        };  
    }, []);

    // This method is to rerender this component when hash change
    const handleHashchange = () => {
        setKey((prevKey) => prevKey + 1);
    };

    return (<main className='main-container' role='main'>
        <MessageProvider>
            <HashRouter>
                <Routes>
                    <Route path='/confirm' element={<Confirm />}></Route>
                    <Route path='/paymentSuccess/:id/:token/:serviceFee' element={<PaymentSuccessPage />}></Route>
                    <Route path='/connectStripe/:accountId/:type' element={<ConnectStripeAccount/>}></Route>
                    <Route path='/checkout' element={<Checkout />}></Route>
                    <Route path='/appointment' element={<Appointment/>}></Route>
                    <Route path='/retailer' element={<RetailerRouter />} />
                    <Route path='/*' element={<DashboardContainer key={key} />} />
                </Routes>
            </HashRouter>
        </MessageProvider>
    </main>);
};

export default MainRouter;
