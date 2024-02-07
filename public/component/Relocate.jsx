import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    EMAIL_BOOKED,
    EMAIL_INVOICE,
    EMAIL_REMINDER,
    EMAIL_TODAY,
    PRODUCT_LAUNCH,
    CUSTOMER_UI,
    UI_RETAILER,
    DASHBOARD_UI
} from '../js/const/SessionStorageConst';
import { getLaunchType, setLaunchType } from '../js/util/SessionStorageUtil';

// Based on launch type this will load the relevant component
const Relocate = () => {

    const launchType = getLaunchType();
    const history = useNavigate();
    useEffect(() => {
        // IMPORTANT: make sure you set the launch type to empty within each launch.
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
            case CUSTOMER_UI:
                setLaunchType('');
                history.push('/customer');
                break;
            case UI_RETAILER:
                setLaunchType('');
                history.push('/retailer');
                break;
            default:
                break;
        }
    }, [launchType]);

};

export default Relocate;
