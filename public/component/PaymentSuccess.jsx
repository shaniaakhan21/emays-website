import React, { useEffect } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import './paymentSuccess.css';
import { useLocation, useParams } from 'react-router-dom';
import { submitCheckout } from '../services/stripe';
import { getServiceCost } from '../js/util/SessionStorageUtil';

const PaymentSuccessPage = () => {
    const location = useLocation();
    const { id, token } = useParams();
    useEffect(() => {
        (async () => {
            await submitCheckout(id, token, getServiceCost());
        })();
    }, []);
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