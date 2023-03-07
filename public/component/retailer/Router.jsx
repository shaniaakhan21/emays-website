import { Route, Switch } from 'react-router-dom';

// Components
import RetailerHome from './Home';
import RetailerLetsTalk from './LetsTalk';
import RetailerFAQ from './faq';

const RetailerRouter = () => {
    return (
        <Switch>
            <Route path='/retailer' exact component={() => <RetailerHome />} />
            <Route path='/retailer/letsTalk' component={() => <RetailerLetsTalk />} />
            <Route path='/retailer/faq' component={() => <RetailerFAQ />} />
        </Switch>
    );
};

export default RetailerRouter;
