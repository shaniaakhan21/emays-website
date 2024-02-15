
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

// SCSS
import '../scss/main.scss';

// Components
import CustomerRouter from './customer/Router';
import RetailerRouter from './retailer/Router';
import { MessageProvider } from './common/messageCtx';
import { useTranslation } from 'react-i18next';
import { getWebLanguage } from '../js/util/LocalStorageUtil';

// Util

const MainRouter = () => {

    return (<main className='main-container' role='main'>
        <MessageProvider>
            <BrowserRouter>
                <Routes>
                    <Route path='/retailer' element={<RetailerRouter />} />
                    <Route path='/*' element={<CustomerRouter />} />
                </Routes>
            </BrowserRouter>
        </MessageProvider>
    </main>);
};

export default MainRouter;
