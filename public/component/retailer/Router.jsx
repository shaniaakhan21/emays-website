import { Route, Routes } from 'react-router-dom';

// Components
import RetailerLetsTalk from './LetsTalk';
import RetailerFAQs from './FAQs';
import RetailerLanding from './Landing';
import RetailerIntegration from './Integration';
import RetailerPartnership from './Partnership';

const RetailerRouter = () => {
    return (
        <Routes>
            <Route path='/' exact element={<RetailerLanding />} />
            <Route path='/retailer/letsTalk' element={<RetailerLetsTalk />} />
            <Route path='/retailer/faq' element={<RetailerFAQs />} />
            <Route path='/retailer/integration' element={<RetailerIntegration />} />
            <Route path='/retailer/partnership' element={<RetailerPartnership />} />
        </Routes>
    );
};

export default RetailerRouter;
