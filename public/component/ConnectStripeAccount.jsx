/* eslint-disable max-len */
import React, { useEffect } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import './paymentSuccess.css';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';

const ConnectStripeAccount = () => {
    const location = useLocation();
    const { accountId, type } = useParams();
    const stripeSecretKey = 'sk_test_51MyGFvB7uMaHzfLgYAJMVDmQrAV6KkgMe3vV2UMq2w0MppsugqMg8uPodMwx89gpuOSDOqhXjVBAHEAYAwq5hAvi00M4DD8qRu';
    console.log('location is', location.pathname, accountId, type);
    useEffect(() => {
        fetchAccountInfo();
    }, []);

    const fetchAccountInfo = async () => {
        try {
            console.log('in fetch api ');
            const response = await axios.get(`https://api.stripe.com/v1/accounts/${accountId}`, {
                headers: {
                    Authorization: `Bearer ${stripeSecretKey}`
                }
            });
            console.log('Account Info:', response.data);
        } catch (error) {
            console.error('Error fetching account information:', error);
        }
    };
    return (
        <div className='payment-success-container'>
            <div className='payment-success-heading'>
        Stripe Connection
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

export default ConnectStripeAccount;
