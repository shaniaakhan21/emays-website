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
            <Route path='/' exact component={() => <RetailerLanding />} />
            <Route path='/retailer/letsTalk' component={() => <RetailerLetsTalk />} />
            <Route path='/retailer/faq' component={() => <RetailerFAQs />} />
            <Route path='/retailer/integration' component={() => <RetailerIntegration />} />
            <Route path='/retailer/partnership' component={() => <RetailerPartnership />} />
        </Routes>
    );
};

export default RetailerRouter;
