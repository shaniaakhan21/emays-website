import { useHistory } from 'react-router-dom';
import { getLaunchType, getUserData, setLaunchType } from '../../js/util/SessionStorageUtil';
import { useEffect } from 'react';
import {
    CHECKOUT_INFO,
    EMAIL_BOOKED, EMAIL_EDIT,
    EMAIL_INVOICE,
    EMAIL_REMINDER,
    EMAIL_TODAY,
    PRODUCT_LAUNCH, UI_RETAILER
} from '../../js/const/SessionStorageConst';
import useSessionState from '../../js/util/useSessionState';

const RouterWebApp = () => {

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
           Something went wrong
        </>
    );
};

export default RouterWebApp;
