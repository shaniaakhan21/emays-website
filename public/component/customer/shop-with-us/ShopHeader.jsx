import { Grid, Column } from '@carbon/react';
import '../../../scss/component/customer/shopheader.scss';

const ShopHeader = () => {
    return ( 
        <Grid className='section-box'>
            <Column lg={16} md={8} sm={4} className='head-section'>
                <h1>
                    Why Shopping with us?
                </h1>
            </Column>
        </Grid>
    );
};

export default ShopHeader;
