import { Route, Switch } from 'react-router-dom';
import Environment from './Environment';
import ShopWithUs from './ShopWithUs';
// Components
import CustomerHome from './Home';
import Services from './Services';

const CustomerRouter = () => {
    return (
        <Switch>
            <Route path='/customer' exact component={() => <CustomerHome />} />
            <Route path='/customer/environment' component={() => <Environment />} />
            <Route path='/customer/services' component={() => <Services />} />
            <Route path='/customer/shop-with-us' component={() => <ShopWithUs />}/>
        </Switch>
    );
};

export default CustomerRouter;
