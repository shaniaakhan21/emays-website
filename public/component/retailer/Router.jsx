import { Route, Routes } from 'react-router-dom';

// Components
import RetailerLetsTalk from './LetsTalk';
import RetailerFAQs from './FAQs';
import RetailerLanding from './Landing';
import RetailerIntegration from './Integration';
import RetailerPartnership from './Partnership';
import { DashboardContainer } from '../dashboard/DashboardContainer';

const RetailerRouter = () => {
    return (
        <Routes>
            <Route path='/' exact element={<RetailerLanding />} />
            <Route path='/letsTalk' element={<RetailerLetsTalk />} />
            <Route path='/faq' element={<RetailerFAQs />} />
            <Route path='/integration' element={<RetailerIntegration />} />
            <Route path='/partnership' element={<RetailerPartnership />} />
            <Route path='/dashboard' element={<DashboardContainer />} />
        </Routes>
    );
};

export default RetailerRouter;
