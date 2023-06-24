import React from 'react';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

const initializeGoogleAnalytics = () => {
    let consent = localStorage.getItem('cookie-consent');
  
    if (consent === 'true') {
        let gtmScript = document.createElement('script');
        gtmScript.async = true;
        gtmScript.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-WPMXCTK';
        let gtmNoScript = document.createElement('noscript');
        let gtmIframe = document.createElement('iframe');
        gtmIframe.src = 'https://www.googletagmanager.com/ns.html?id=GTM-WPMXCTK';
        gtmIframe.height = '0';
        gtmIframe.width = '0';
        gtmIframe.style.display = 'none';
        gtmIframe.style.visibility = 'hidden';
        gtmNoScript.appendChild(gtmIframe);
        document.head.appendChild(gtmScript);
        document.body.appendChild(gtmNoScript);
        console.log('Google Tag Manager enabled');
    } else {
        console.log('Google Tag Manager disabled');
  
        window['ga-disable-GTM-WPMXCTK'] = true;
    }
};
  
const handleCookieConsent = (consent) => {
    if (consent) {
        localStorage.setItem('cookie-consent', 'true');
        initializeGoogleAnalytics(); 
    } else {
        localStorage.setItem('cookie-consent', 'false');
    }
  
    let cookieBanner = document.getElementById('cookie-consent');
    cookieBanner.classList.add('fade-out');
};
const CookieBanner = () => {
    const [translate] = useTranslation();

    const t = (str) => translate(`cookie-banner.${str}`);
    useEffect(() => {
        initializeGoogleAnalytics();
    
        let consent = localStorage.getItem('cookie-consent');
        if (consent === 'true' || consent === 'false') {
            let cookieBanner = document.getElementById('cookie-consent');
            cookieBanner.classList.add('fade-out');
        }
    }, []);
  
    return (
        <div id='cookie-consent'>
            <div>
                <div className='text' dangerouslySetInnerHTML={{ __html: t('text') }} />
            </div>
            <div className='btn-contains'>
                <button
                    id='accept-cookie'
                    className='op-color'
                    onClick={() => handleCookieConsent(true)}
                    style={{ marginRight: '1%' }}
                >
                    {t('accept')}
                </button>
                <button
                    id='decline-cookie'
                    className='op-color'
                    onClick={() => handleCookieConsent(false)}
                >
                    {t('decline')}
                </button>
            </div>
        </div>
    );
};

export default CookieBanner;
