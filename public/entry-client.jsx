
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './component/MainRouterSSR';

ReactDOM.hydrateRoot(
    document.getElementById('app'), <BrowserRouter>
        <App />
    </BrowserRouter>
);
console.log('hydrated');
