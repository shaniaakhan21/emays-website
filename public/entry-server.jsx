import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './component/MainRouterPublic';

// eslint-disable-next-line func-style
export function render (url, context) {
    return ReactDOMServer.renderToString(
        <StaticRouter location={url} context={context}>
            <App/>
        </StaticRouter>
    );
}
