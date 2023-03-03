import React from 'react';
import ReactDOM from 'react-dom/client';

import './js/util/i18n';
import App from './component/MainRouter';

ReactDOM.createRoot(document.getElementById('app')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

