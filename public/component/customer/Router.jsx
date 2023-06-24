import { Route, Switch } from 'react-router-dom';
import Environment from './Environment';
import ShopWithUs from './ShopWithUs';
// Components
import CustomerHome from './Home';
import Services from './Services';
import RetailerLetsTalk from '../retailer/LetsTalk';
import RetailerFAQs from '../retailer/FAQs';
import RetailerIntegration from '../retailer/Integration';
import RetailerPartnership from '../retailer/Partnership';
import Privacy from './Privacy';
import Terms from './Terms';
import Cookie from './Cookie';

const CustomerRouter = () => {

    return (
        <>
            <Switch>
                <Route path='/' exact component={() => <CustomerHome />} />
                <Route path='/environment' component={() => <Environment />} />
                <Route path='/services' component={() => <Services />} />
                <Route path='/shop-with-us' component={() => <ShopWithUs />}/>
                <Route path='/letsTalk' component={() => <RetailerLetsTalk />} />
                <Route path='/faq' component={() => <RetailerFAQs />} />
                <Route path='/integration' component={() => <RetailerIntegration />} />
                <Route path='/partnership' component={() => <RetailerPartnership />} />
                <Route path='/privacy' component={() => <Privacy />} />
                <Route path='/terms' component={() => <Terms />} />
                <Route path='/cookie' component={() => <Cookie />} />
            </Switch>
        </>
    );
};

export default CustomerRouter;
