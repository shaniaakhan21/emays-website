import { Route, Switch, useHistory } from 'react-router-dom';
import Environment from './Environment';
import ShopWithUs from './ShopWithUs';
// Components
import CustomerHome from './Home';
import Services from './Services';
import { getLaunchType, setLaunchType } from '../../js/util/SessionStorageUtil';
import { useEffect } from 'react';
import {
    CUSTOMER_UI,
    EMAIL_BOOKED,
    EMAIL_INVOICE,
    EMAIL_REMINDER,
    EMAIL_TODAY,
    PRODUCT_LAUNCH, UI_RETAILER
} from '../../js/const/SessionStorageConst';
import RetailerLetsTalk from '../retailer/LetsTalk';
import RetailerFAQs from '../retailer/FAQs';
import RetailerLanding from '../retailer/Landing';
import RetailerIntegration from '../retailer/Integration';
import RetailerPartnership from '../retailer/Partnership';

const CustomerRouter = () => {

    const launchType = getLaunchType();
    const history = useHistory();
    useEffect(() => {
        // IMPORTANT: make sure you set the launch type to empty within each launch.
        console.log('launchType', launchType);
        switch (launchType) {
            case PRODUCT_LAUNCH:
                setLaunchType('');
                history.push('/checkout');
                break;
            case EMAIL_BOOKED:
            case EMAIL_REMINDER:
            case EMAIL_TODAY:
            case EMAIL_INVOICE:
                setLaunchType('');
                const params = new URLSearchParams({
                    launchType: launchType
                });
                history.push(`/appointment?${params.toString()}`);
                break;
            case UI_RETAILER:
                setLaunchType('');
                history.push('/retailer');
                break;
            default:
                setLaunchType('');
                break;
        }
    }, [launchType]);

    return (
        <Switch>
            <Route path='/' exact component={() => <CustomerHome />} />
            <Route path='/environment' component={() => <Environment />} />
            <Route path='/services' component={() => <Services />} />
            <Route path='/shop-with-us' component={() => <ShopWithUs />}/>
            <Route path='/letsTalk' component={() => <RetailerLetsTalk />} />
            <Route path='/faq' component={() => <RetailerFAQs />} />
            <Route path='/landing' component={() => <RetailerLanding />} />
            <Route path='/integration' component={() => <RetailerIntegration />} />
            <Route path='/partnership' component={() => <RetailerPartnership />} />
        </Switch>
    );
};

export default CustomerRouter;
