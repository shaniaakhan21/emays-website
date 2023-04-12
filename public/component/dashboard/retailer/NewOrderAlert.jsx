import { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const NewOrderAlert = () => {
    const [showAlert, setShowAlert] = useState(true);
    const { t } = useTranslation();
    return (
        <>
            {showAlert && (
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: '#231F20',
                        color: 'white',
                        padding: '1% 3% 1% 1%',
                        width: '42%',
                        justifyContent: 'space-between',
                        marginLeft: '58%',
                        border: '2px solid #24A148',
                        borderBottomWidth: '1px'
            
                    }}
                >
                
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-evenly',
                        alignItems: 'center'
                    }}>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '30px',
                                height: '30px',
                                borderRadius: '50%',
                                marginRight: '10px'
                            }}
                        >
                            <FaCheckCircle style={{ color: '#42BE65' }} />
                        
                        </div>
                        <div style={{ marginRight: '10px', fontSize: '14px', lineHeight: '18px' }}><b>
                            {t('dashboard.order-alert.first-text')}</b>
                        {t('dashboard.order-alert.second-text')}</div>
                    </div>
                    <a href='#' style={{ color: '#78A9FF', fontSize: '14px', lineHeight: '18px' }}>
                        {t('dashboard.order-alert.link-text')}
                    </a>
                </div>
            )}
        </>
    );
};

export default NewOrderAlert;
