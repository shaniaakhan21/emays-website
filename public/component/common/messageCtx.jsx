import { useState, createContext, useContext } from 'react';
import { InlineNotification } from '@carbon/react';

const MessageContext = createContext({
    showAlert: {},
    setShowAlert: () => {}
});

export const MessageProvider = ({ children }) => {
    const [showAlert, setShowAlert] = useState([]);

    return (
        <MessageContext.Provider value={{ showAlert, setShowAlert }}>
            <div className='message-container'>
                {showAlert.map(props => <InlineNotification {...props} />)}
            </div>
            {children}
        </MessageContext.Provider>
    );
};

export const useMessage = () => {
    const context = useContext(MessageContext);
    const pushAlert = (alert, timeout) => {
        alert.id = `alert_${new Date().getTime()}`;
        context.setShowAlert((ca) => [...ca, alert]);
        setTimeout(() => {
            context.setShowAlert((ca) => ca.filter((a) => a.id !== alert.id));
        }, timeout ?? 5000);
    };

    if (context === undefined) {
        throw new Error('useLang must be used within a MessageProvider');
    }
    return pushAlert;
};
