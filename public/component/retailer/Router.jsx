import { Route, Switch } from 'react-router-dom';

// Components
import RetailerHome from './Home';
import RetailerLetsTalk from './LetsTalk';
import RetailerFAQs from './FAQs';
import RetailerLanding from './Landing';
import RetailerIntegration from './Integration';
import RetailerPartnership from './Partnership';

const RetailerRouter = () => {
    return (
        <Switch>
            <Route path='/retailer' exact component={() => <RetailerHome />} />
            <Route path='/retailer/letsTalk' component={() => <RetailerLetsTalk />} />
            <Route path='/retailer/faq' component={() => <RetailerFAQs />} />
            <Route path='/retailer/landing' component={() => <RetailerLanding />} />
            <Route path='/retailer/integration' component={() => <RetailerIntegration />} />
            <Route path='/retailer/partnership' component={() => <RetailerPartnership />} />
        </Switch>
    );
};

export default RetailerRouter;
