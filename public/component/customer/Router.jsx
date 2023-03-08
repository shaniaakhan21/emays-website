import { Route, Switch } from 'react-router-dom';
import Environment from './Environment';

// Components
import CustomerHome from './Home';

const CustomerRouter = () => {
    return (
        <Switch>
            <Route path='/customer' exact component={() => <CustomerHome />} />
            <Route path='/customer/environment' component={() => <Environment />} />
        </Switch>
    );
};

export default CustomerRouter;
