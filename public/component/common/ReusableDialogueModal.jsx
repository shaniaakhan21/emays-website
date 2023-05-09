import React from 'react';
import PropTypes from 'prop-types';

const DialogueModal = ({
    title,
    body,
    showModal,
    closeModal,
    confirmAction,
    confirmButtonText = 'Confirm',
    cancelButtonText = 'Cancel'
}) => {

    const modalOverlay = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 9999,
        display: showModal ? 'flex' : 'none',
        justifyContent: 'center',
        alignItems: 'center'
    };

    const modalContent = {
        backgroundColor: 'white',
        padding: '1rem',
        width: '70%',
        maxWidth: '600px',
        textAlign: 'left'
    };

    const closeButton = {
        backgroundColor: '#eee',
        padding: '0.5rem 0.75rem',
        border: 'none',
        top: '0.25rem',
        right: '0.25rem',
        cursor: 'pointer'
    };

    const modalHeader = {
        fontSize: '1.5rem',
        marginBottom: '1rem',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    };

    const modalBody = {
        marginBottom: '1rem'

    };

    const modalFooter = {
        display: 'flex',
        justifyContent: 'space-between',
        paddingTop: '20px'
    };

    const confirmButton = {
        width: '100%',
        height: '48px',
        backgroundColor: '#DC3545',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        marginRight: '0.5rem'
    };

    const cancelButton = {
        backgroundColor: '#393939',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        width: '100%',
        height: '48px'
    };

    return (
        <div style={modalOverlay}>
            <div style={modalContent}>
                <div style={modalHeader}>
                    <div>{title}</div>
                    <div>
                        <button style={closeButton} onClick={closeModal}>X</button>
                    </div>
                </div>
                <div style={modalBody}>{body}</div>
                <div style={modalFooter}>
                    <button style={confirmButton} onClick={confirmAction}>
                        {confirmButtonText}
                    </button>
                    <button style={cancelButton} onClick={closeModal}>
                        {cancelButtonText}
                    </button>
                </div>
            </div>
        </div>
    );
};

DialogueModal.propTypes = {
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    showModal: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    confirmAction: PropTypes.func.isRequired
};

export default DialogueModal;
