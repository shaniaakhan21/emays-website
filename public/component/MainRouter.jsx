
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// SCSS
import '../scss/main.scss';

// Components
import ErrorBoundary from './ErrorBoundary';
import Checkout from './checkout/Checkout';
import Confirm from './checkout/Confirm';
import Appointment from './appointment/Appointment';
import { EMAIL_LAUNCH_TYPE } from '../js/const/SessionStorageConst';

class MainRouter extends React.Component {

    componentDidMount () {
        // TODO call initial data route
        console.log('Data fetched');

        const emailLaunchType = sessionStorage.getItem(EMAIL_LAUNCH_TYPE);
        if (emailLaunchType) {
            window.location.href = '/appointment';
        }
    }

    render () {
        return <main className='main-container' role='main'>
            <ErrorBoundary>
                <Router>
                    <Switch>
                        <Route path='/confirm' component={() => <Confirm/>}></Route>
                        <Route path='/' component={() => <Checkout/>}></Route>
                        <Route path='/appointment' component={() => <Appointment />}></Route>
                    </Switch>

                </Router>
            </ErrorBoundary>
        </main>;
    }

}

export default MainRouter;
