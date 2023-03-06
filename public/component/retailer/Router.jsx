import { Route, Switch } from 'react-router-dom';

// Components
import RetailerHome from './Home';
import RetailerLetsTalk from './LetsTalk';

const RetailerRouter = () => {
    return (
        <Switch>
            <Route path='/retailer' exact component={() => <RetailerHome />} />
            <Route path='/retailer/letsTalk' component={() => <RetailerLetsTalk />} />
        </Switch>
    );
};

export default RetailerRouter;
