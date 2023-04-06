import React from 'react';
import { Modal } from '@carbon/react';
import '../scss/errorboundry.scss';

class ErrorBoundary extends React.Component {
    constructor (props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError (error) {
        if (error instanceof TypeError) {
            return { 
                hasError: true, errorMessage: 
                'There was a problem with the network. Please check your internet connection and try again.' 
            };
        } else if (error instanceof CustomError) {
            return {
                hasError: true,
                errorMessage: 'A custom error has occurred. Please try again later.'
            };
        } else if (error instanceof ReferenceError) {
            return {
                hasError: true,
                errorMessage: 'A reference error has occurred. Please try again later.'
            };
        }
        return { hasError: true };
    }

    componentDidCatch (error, errorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
        this.setState({ error: error, errorInfo: errorInfo });
    }

    handleClose = () => {
        // eslint-disable-next-line no-invalid-this
        this.setState({ hasError: false });
    };

    render () {
        if (this.state.hasError) {
            return (
                <Modal
                    open={this.state.hasError}
                    primaryButtonText='Close'
                    onRequestClose={this.handleClose}
                    modalLabel='Error'
                >
                    <p>Sorry for the inconvenience. Please try again later or contact support for assistance.</p>
                </Modal>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
