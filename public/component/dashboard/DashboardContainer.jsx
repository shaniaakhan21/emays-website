import { Provider } from 'react-redux';
import store from './redux/store';
import { Dashboard } from './Dashboard';
import '../../scss/component/dashboard/dashboardContainer.scss';

export const DashboardContainer = () => {

    return (
        <Provider store={store}>
            <Dashboard />
        </Provider>
    );
};
