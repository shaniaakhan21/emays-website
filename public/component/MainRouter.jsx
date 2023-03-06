
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// SCSS
import '../scss/main.scss';

// Components
import ErrorBoundary from './ErrorBoundary';
import Checkout from './checkout/Checkout';
import Confirm from './checkout/Confirm';

class MainRouter extends React.Component {

    componentDidMount () {
        // TODO call initial data route
        console.log('Data fetched');
    }

    render () {
        return <main className='main-container' role='main'>
            <ErrorBoundary>
                <Router>
                    <Switch>
                        <Route path='/confirm' component={() => <Confirm/>}></Route>
                        <Route path='/' component={() => <Checkout />}></Route>
                    </Switch>

                </Router>
            </ErrorBoundary>
        </main>;
    }

}

export default MainRouter;
