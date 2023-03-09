import PropTypes from 'prop-types';
import '../../scss/component/retailer/common.scss';
import { Grid } from '@carbon/react';

const RetailerLayout = ({
    className,
    children
}) => {
    return (
        <Grid className={`retailer-main${className ? ` ${className}` : ''}`} fullWidth>
            {children}
        </Grid>
    );
};

RetailerLayout.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node
};

export default RetailerLayout;
