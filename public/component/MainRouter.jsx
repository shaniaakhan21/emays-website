
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Container from './Container';
import ErrorBoundary from './ErrorBoundary';

class MainRouter extends React.Component {

    componentDidMount () {
        // TODO call initial data route
        console.log('Data fetched');
    }

    render () {
        return <main className='main-container' role='main'>
            <ErrorBoundary>
                <Router>
                    <div>
                        <header>Header App</header>
                    </div>
                    <Switch>
                        <Route path='/' component={() => <Container/>}></Route>
                    </Switch>
                    <footer>Footer App</footer>
                </Router>
            </ErrorBoundary>
        </main>;
    }

}

export default MainRouter;
