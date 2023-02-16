
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Container from './Container';
import ErrorBoundary from './ErrorBoundary';

// SCSS
import '../scss/main.scss';
import Launcher from './Launcher';

class MainRouter extends React.Component {

    componentDidMount () {
        // TODO call initial data route
        console.log('Data fetched');
    }

    render () {
        return <main className='main-container' role='main'>
            <ErrorBoundary>
                <Launcher/>
                <Router>
                    <Switch>
                        <Route path='/' component={() => <Container/>}></Route>
                    </Switch>
                </Router>
            </ErrorBoundary>
        </main>;
    }

}

export default MainRouter;
