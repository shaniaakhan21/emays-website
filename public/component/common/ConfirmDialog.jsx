import { Modal } from '@carbon/react';
import PropTypes from 'prop-types';

// Images

// SCSS
import '../../scss/component/checkout/payment.scss';

// Custom components

const ConfirmDialog = ({ open, setOpen, children, ...props }) => {
    
    return <Modal
        size='xs'
        open={open}
        onRequestClose={() => setOpen(false)}
        onClose={() => setOpen(false)}
        alert
        danger
        {...props}
    >{children}</Modal>;
};

ConfirmDialog.prototype = {
    ...Modal.propTypes,
    open: PropTypes.any,
    setOpen: PropTypes.func,
    children: PropTypes.node
};

export default ConfirmDialog;
