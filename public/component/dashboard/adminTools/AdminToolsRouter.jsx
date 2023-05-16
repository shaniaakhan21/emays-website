import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import AdminTools from './AdminTools';
import CreateRetailer from './createRetailer/CreateRetailer';
import CreateDriver from './createDriver/CreateDriver';

const AdminToolsRouter = () => {
    return (
        <Router>
            <Switch>
                <Route exact path='/dashboard/adminTools'
                    component={() => <AdminTools />}></Route>
                <Route exact path='/dashboard/adminTools/createRetailer'
                    component={() => <CreateRetailer />}></Route>
                <Route exact path='/dashboard/adminTools/createDriver'
                    component={() => <CreateDriver />}></Route>
            </Switch>
        </Router>
    );
};

export default React.memo(AdminToolsRouter);
