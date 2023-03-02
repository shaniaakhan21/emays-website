import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { EMAIL_LAUNCH, PRODUCT_LAUNCH } from '../js/const/SessionStorageConst';
import { getLaunchType, setLaunchType } from '../js/util/SessionStorageUtil';

// Based on launch type this will load the relevant component
const Relocate = () => {

    const launchType = getLaunchType();
    const history = useHistory();
    useEffect(() => {
        // IMPORTANT: make sure you set the launch type to empty within each launch.
        switch (launchType) {
            case PRODUCT_LAUNCH:
                setLaunchType('');
                history.push('/checkout');
                break;
            case EMAIL_LAUNCH:
                setLaunchType('');
                history.push('/appointment');
                break;
            default:
                break;
        }
    }, [launchType]);

};

export default Relocate;
