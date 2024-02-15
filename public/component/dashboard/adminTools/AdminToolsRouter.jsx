import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminTools from './AdminTools';
import CreateRetailer from './createRetailer/CreateRetailer';
import CreateDriver from './createDriver/CreateDriver';

const AdminToolsRouter = () => {
    return (
        <Routes>
            <Route exact path='/'
                element={<AdminTools />}></Route>
            <Route exact path='/createRetailer'
                element={<CreateRetailer />}></Route>
            <Route exact path='/createDriver'
                element={<CreateDriver />}></Route>
        </Routes>
    );
};

export default React.memo(AdminToolsRouter);
