import PropTypes from 'prop-types';
import '../../scss/component/retailer/common.scss';
import { Grid } from '@carbon/react';
import Nav from './Nav';

const RetailerLayout = ({
    className,
    children
}) => {
    return (
        <Grid className={`retailer-main${className ? ` ${className}` : ''}`} fullWidth>
            <Nav retailer />
            {children}
        </Grid>
    );
};

RetailerLayout.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node
};

export default RetailerLayout;
