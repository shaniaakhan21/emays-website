import { Route, Switch, useHistory } from 'react-router-dom';
import Environment from './Environment';
import ShopWithUs from './ShopWithUs';
// Components
import CustomerHome from './Home';
import Services from './Services';
import { getLaunchType, getUserData, setLaunchType } from '../../js/util/SessionStorageUtil';
import { useEffect } from 'react';
import {
    CHECKOUT_INFO,
    CUSTOMER_UI,
    EMAIL_BOOKED, EMAIL_EDIT,
    EMAIL_INVOICE,
    EMAIL_REMINDER,
    EMAIL_TODAY,
    PRODUCT_LAUNCH, UI_RETAILER
} from '../../js/const/SessionStorageConst';
import RetailerLetsTalk from '../retailer/LetsTalk';
import RetailerFAQs from '../retailer/FAQs';
import RetailerIntegration from '../retailer/Integration';
import RetailerPartnership from '../retailer/Partnership';
import useSessionState from '../../js/util/useSessionState';
import Privacy from './Privacy';
import Terms from './Terms';

const CustomerRouter = () => {

    const launchType = getLaunchType();
    const history = useHistory();
    const [_, setState] = useSessionState(CHECKOUT_INFO);

    useEffect(() => {
        // IMPORTANT: make sure you set the launch type to empty within each launch.
        switch (launchType) {
            case PRODUCT_LAUNCH:
                setLaunchType('');
                document.body.classList.remove('bg');
                history.push('/checkout');
                break;
            case EMAIL_EDIT:
                setLaunchType('');
                document.body.classList.remove('bg');
                setState({ ...getUserData(), launchType: EMAIL_EDIT, options: {
                    assist: getUserData().experience.includes('Assist Me') ? true : false,
                    tailoring: getUserData().experience.includes('Tailoring') ? true : false,
                    inspire: getUserData().experience.includes('Inspire Me') ? true : false
                } });
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
                document.body.classList.add('bg');
                history.push('/retailer');
                break;
            default:
                setLaunchType('');
                document.body.classList.add('bg');
                break;
        }
    }, [launchType]);

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
            </Switch>
        </>
    );
};

export default CustomerRouter;
