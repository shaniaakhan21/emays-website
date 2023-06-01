
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

// SCSS
import '../scss/main.scss';

// Components
import ErrorBoundary from './ErrorBoundary';
import Appointment from './appointment/AppointmentDetails';
import { MessageProvider } from './common/messageCtx';

// Util
import '../js/util/i18n';
import Confirm from './checkout/Confirm';
import Checkout from './checkout/Checkout';

const MainRouter = () => {

    useEffect(() => {
        document.body.classList.add('bg');
    }, []);

    return (<main className='main-container' role='main'>
        <ErrorBoundary>
            <MessageProvider>
                <Routes>
                    <Route path='/confirm' element={<Confirm />}></Route>
                    <Route path='/checkout' element={<Checkout />}></Route>
                    <Route path='/appointment' element={<Appointment/>}></Route>
                </Routes>
            </MessageProvider>
        </ErrorBoundary>
    </main>);
};

export default MainRouter;
