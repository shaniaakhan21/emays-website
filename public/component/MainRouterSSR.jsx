import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

// SCSS
import '../scss/main.scss';

// Components
import ErrorBoundary from './ErrorBoundary';
import RetailerRouter from './retailer/Router';
import { MessageProvider } from './common/messageCtx';

// Util
import '../js/util/i18n';
import Environment from './customer/Environment';
import Services from './customer/Services';
import ShopWithUs from './customer/ShopWithUs';
import RetailerLetsTalk from './retailer/LetsTalk';
import RetailerFAQs from './retailer/FAQs';
import RetailerIntegration from './retailer/Integration';
import RetailerPartnership from './retailer/Partnership';
import Privacy from './customer/Privacy';
import Terms from './customer/Terms';
import CustomerHome from './customer/Home';
import RetailerLanding from './retailer/Landing';

const MainRouter = () => {

    useEffect(() => {
        document.body.classList.add('bg');
    }, []);

    return (<main className='main-container' role='main'>
        <ErrorBoundary>
            <MessageProvider>
                <Routes>
                    {/* <Route path='/retailer' element={<RetailerRouter />} /> */}
                    <Route path='/retailer' element={<RetailerLanding />} />
                    <Route path='/environment' element={<Environment />} />
                    <Route path='/services' element={<Services />} />
                    <Route path='/shop-with-us' element={<ShopWithUs />}/>
                    <Route path='/letsTalk' element={<RetailerLetsTalk />} />
                    <Route path='/faq' element={<RetailerFAQs />} />
                    <Route path='/integration' element={<RetailerIntegration />} />
                    <Route path='/partnership' element={<RetailerPartnership />} />
                    <Route path='/privacy' element={<Privacy />} />
                    <Route path='/terms' element={<Terms />} />
                    <Route path='/' exact element={<CustomerHome />} />
                </Routes>
            </MessageProvider>
        </ErrorBoundary>
    </main>);
};

export default MainRouter;
