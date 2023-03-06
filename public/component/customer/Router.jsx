import { Route, Switch } from 'react-router-dom';

// Components
import CustomerHome from './Home';

const CustomerRouter = () => {
    return (
        <Switch>
            <Route path='/customer' exact component={() => <CustomerHome />} />
        </Switch>
    );
};

export default CustomerRouter;
