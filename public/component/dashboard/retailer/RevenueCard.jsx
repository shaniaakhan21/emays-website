import React from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from 'mdbreact';
import '../../../scss/component/dashboard/retailer/revenuecard.scss';

const TotalRevenueCard = ({ title, value }) => {
    return (
        <MDBCard col='2'>
            <MDBCardBody className='text-center'>
                <MDBCardTitle className='card-title-h4'>{title}</MDBCardTitle>
                <MDBCardText className='h3'>{value}</MDBCardText>
            </MDBCardBody>
        </MDBCard>
    );
};

export default TotalRevenueCard;
