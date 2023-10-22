import React from 'react';
import PropTypes from 'prop-types';
import './../../scss/component/retailer/status-box.scss';
import PropTypes from 'prop-types';

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
    const statusClass = statusToClass[status] || 'default-status';
    const backgroundColor = statusToBackgroundColor[status] || 'transparent';

    const style = {
        backgroundColor: backgroundColor
    };

    const text = getText(status);
    return (
        <div className={`status-box 
        ${status === 'Ready to pick up' ? 'ready-to-pick-up' : 'pending-to-pickup'}`} style={style}>
            {text}
        </div>
    );
};

StatusBox.propTypes = {
    status: PropTypes.string.isRequired
};

export default StatusBox;
