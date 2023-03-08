import { Route, Switch } from 'react-router-dom';

// Components
import RetailerHome from './Home';
import RetailerLetsTalk from './LetsTalk';
import RetailerFAQs from './FAQs';
import RetailerLanding from './Landing';

const RetailerRouter = () => {
    return (
        <Switch>
            <Route path='/retailer' exact component={() => <RetailerHome />} />
            <Route path='/retailer/letsTalk' component={() => <RetailerLetsTalk />} />
            <Route path='/retailer/faq' component={() => <RetailerFAQs />} />
            <Route path='/retailer/landing' component={() => <RetailerLanding />} />
        </Switch>
    );
};

export default RetailerRouter;
