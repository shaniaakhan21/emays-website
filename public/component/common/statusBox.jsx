import {
    TableHead,
    TableRow,
    TableHeader, TableBody, TableCell, DataTable, Table as CarbonTable
} from '@carbon/react';
import React from 'react';

// SCSS
import './../../scss/component/retailer/status-box.scss';
import PropTypes from 'prop-types';

// Components
const statusToClass = {
    'Pending to pick up': 'pending-pick-up'
};

// Images

const StatusBox = ({ status }) => {
    return (
        <div className={`status-box ${statusToClass[status]}`}>{status}</div>
    );
};

StatusBox.propTypes = {
    status: PropTypes.string.isRequired
};

export default StatusBox;
