import { Route, Switch } from 'react-router-dom';

// Components
import RetailerLetsTalk from './LetsTalk';
import RetailerFAQs from './FAQs';
import RetailerLanding from './Landing';
import RetailerIntegration from './Integration';
import RetailerPartnership from './Partnership';
import RetailerLogin from '../dashboard/retailer/Login';
import RetailerDashboardLayout from '../dashboard/retailer/DashboardLayout';

const RetailerRouter = () => {
    return (
        <Switch>
            <Route path='/retailer' exact component={() => <RetailerLanding />} />
            <Route path='/retailer/letsTalk' component={() => <RetailerLetsTalk />} />
            <Route path='/retailer/faq' component={() => <RetailerFAQs />} />
            <Route path='/retailer/integration' component={() => <RetailerIntegration />} />
            <Route path='/retailer/partnership' component={() => <RetailerPartnership />} />
            <Route path='/retailer/login' component={() => <RetailerLogin />} />
            <Route path='/retailer/dashboard' component={() => <RetailerDashboardLayout />} />
        </Switch>
    );
};

export default RetailerRouter;
