import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import AdminTools from './AdminTools';
import CreateRetailer from './createRetailer/CreateRetailer';
import CreateDriver from './createDriver/CreateDriver';

const AdminToolsRouter = () => {
    return (
        <Router>
            <Routes>
                <Route exact path='/dashboard/adminTools'
                    component={() => <AdminTools />}></Route>
                <Route exact path='/dashboard/adminTools/createRetailer'
                    component={() => <CreateRetailer />}></Route>
                <Route exact path='/dashboard/adminTools/createDriver'
                    component={() => <CreateDriver />}></Route>
            </Routes>
        </Router>
    );
};

export default React.memo(AdminToolsRouter);
