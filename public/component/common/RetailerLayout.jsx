import PropTypes from 'prop-types';
import '../../scss/component/retailer/common.scss';
import { Grid } from '@carbon/react';
import Nav from './Nav';

const RetailerLayout = ({
    className,
    children,
    withoutNav,
    ...props
}) => {
    return (
        <Grid className={`retailer-main${className ? ` ${className}` : ''}`} fullWidth>
            {!withoutNav && <Nav refs={props.refs} retailer/>}
            {children}
        </Grid>
    );
};

RetailerLayout.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    refs: PropTypes.arrayOf(
        PropTypes.oneOfType([
            // Either a function
            PropTypes.func,
            // Or the instance of a DOM native element (see the note about SSR)
            PropTypes.shape({ current: PropTypes.node })
        ])
    )
};

export default RetailerLayout;
