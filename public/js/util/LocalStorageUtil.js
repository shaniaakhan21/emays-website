'Use Strict';

// Keys
export const Languages = {
    ITALY: 'it',
    ENGLISH: 'en'
};

const WEB_LANG = 'web_lang';

// Methods
export const setWebsiteLanguage = (language) => {
    localStorage.setItem(WEB_LANG, language);
};

export const getWebLanguage = () => {
    return localStorage.getItem(WEB_LANG);
};

