import { Provider } from 'react-redux';
import store from './redux/store';
import { Dashboard } from './Dashboard';

export const DashboardContainer = () => {

    return (
        <Provider store={store}>
            <Dashboard />
        </Provider>
    );
};
