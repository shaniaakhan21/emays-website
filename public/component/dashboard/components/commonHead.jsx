import React from 'react';
import '../../../scss/component/retailer/common.scss';
import EmaysLogo from '../../../images/Dashboard/EmaysLogo.svg';
const CommonHead = () => {
    return (
        <>
            <div className='Retail-header'>
                <img src={EmaysLogo}/>
                <h5>Retailer's Control panel</h5>
            </div>
        </>
    );
};

export default CommonHead;
