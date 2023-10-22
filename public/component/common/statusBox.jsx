import {
    TableHead,
    TableRow,
    TableHeader, TableBody, TableCell, DataTable, Table as CarbonTable
} from '@carbon/react';
import React from 'react';

// SCSS
import './../../scss/component/retailer/status-box.scss';
import PropTypes from 'prop-types';
import { ARCHIVED, ITEMS_TO_BE_RETURNED, NEW_ORDER, ON_DELIVERY, PENDING_TO_PICKUP } from '../../js/const/OrderStatus';

// Components
const statusToClass = {
    'pending-pick-up': 'pending-pick-up',
    'new-order': 'new-order',
    'items-to-be-return': 'items-to-be-return',
    'on-delivery': 'on-delivery',
    'archived': 'archived'
};

// Images

const getText = (status) => {
    switch (status) {
        case 'pending-pick-up':
            return PENDING_TO_PICKUP;
        case 'new-order':
            return NEW_ORDER;
        case 'items-to-be-return':
            return ITEMS_TO_BE_RETURNED;
        case 'on-delivery':
            return ON_DELIVERY;
        case 'archived':
            return ARCHIVED;
        default:
            return 'Unknown status';
    }
} ;

const StatusBox = ({ status }) => {
    const text = getText(status);
    return (
        <div className={`status-box ${statusToClass[status]}`}>{text}</div>
    );
};

StatusBox.propTypes = {
    status: PropTypes.string.isRequired
};

export default StatusBox;
