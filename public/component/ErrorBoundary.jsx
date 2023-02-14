'use strict';

import React from 'react';

class ErrorBoundary extends React.Component {

    constructor (props) {
        super(props);
        this.state = { 
            hasError: false, 
            error: null, 
            errorInfo: null };
        this.catchThrownErrors = this.catchThrownErrors.bind(this);
    }
  
    static getDerivedStateFromError (error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }
  
    componentDidCatch (error, errorInfo) {
        // Call error reporting service and render error message
        console.error('errorboundryError: ', errorInfo);

    }
    
    componentDidMount () {
        this.catchThrownErrors();
    }

    catchThrownErrors () {
        window.onunhandledrejection = function (event) {
            const errorDetails = event.reason;
            this.setState({
                hasError: true,
                errorCode: errorDetails.code, 
                errorMessage: errorDetails.message,
                errorDescription: errorDetails.description
            });

        }.bind(this);
    }

    render () {
        // TODO: Display different error message based on the returned Error Type
        if (this.state.hasError) {
            return (
                // TODO: Display nice alert
                console.error('Error message.', errorDetails)
            );
        }
        return this.props.children; 
    }
}

export default ErrorBoundary;
