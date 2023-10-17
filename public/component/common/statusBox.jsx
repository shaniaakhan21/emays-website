import React from 'react';
import PropTypes from 'prop-types';
import './../../scss/component/retailer/status-box.scss';

const statusToClass = {
    'Pending to pickup': 'pending-pick-up',
    'Ready to pick up': 'ready-pick-up',
    'On Delivery': 'on-delivery'
};

const statusToBackgroundColor = {
    'Pending to pickup': '#D0E2FF',
    'Ready to pick up': '#DEFBE6',
    'On Delivery': '#E0E0E0'
};

const StatusBox = ({ status }) => {
    const statusClass = statusToClass[status] || 'default-status';
    const backgroundColor = statusToBackgroundColor[status] || 'transparent';

    const style = {
        backgroundColor: backgroundColor
    };

    return (
        <div className={`status-box 
        ${status === 'Ready to pick up' ? 'ready-to-pick-up' : 'pending-to-pickup'}`} style={style}>
            {status}
        </div>
    );
};

StatusBox.propTypes = {
    status: PropTypes.string.isRequired
};

export default StatusBox;
