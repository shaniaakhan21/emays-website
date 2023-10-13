import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import './paymentSuccess.css';

const PaymentSuccessPage = () => {
    return (
        <div className='payment-success-container'>
            <div className='payment-success-heading'>
        Payment Success
            </div>
            <div className='payment-success-icon'>
                <FaCheckCircle />
            </div>
            <div className='payment-success-button'>
                <button onClick={() => {
                    window.location.href = `${window.location.protocol}//${window.location.host}`;
                }}>Continue Shopping</button>
            </div>
        </div>
    );
};

export default PaymentSuccessPage;
