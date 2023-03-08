import React from 'react';
import {
    Grid,
    Column,
    Button
} from '@carbon/react';
import '../../scss/component/customer/homesection.scss';
import DELIVERYBAG from '../../images/HomeCustomerSection/DELIVERYBAG.png';

const HomeSection = () => {
    return (
        <Grid className='shipping-section'>
            <Column lg={7} >
                <div className='shipping-section__left'>
                    <h1 className='shipping-section__title alignment'>WE SHIP THE SHOP</h1>
                    <h2 className='shipping-section__subtitle alignment'>
                        Take the luxury Shopping to experience your house
                    </h2>
                    <h3 className='shipping-section__description alignment'>
                        Try What you want, pay only what you keep.
                    </h3>
                    <Button className='shipping-section__button alignment'>
                        See what we can do for you
                    </Button>
                </div>
            </Column>
            <Column lg={9} >
                <div className='shipping-section__right'>
                    <img src={DELIVERYBAG} alt='DELIVERY BAG' />
                </div>
            </Column>
        </Grid>
    );
};

export default HomeSection;
