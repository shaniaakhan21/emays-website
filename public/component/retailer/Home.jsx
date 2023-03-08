import { Column } from '@carbon/react';

// Components
import RetailerLayout from '../common/RetailerLayout';
import { Link } from 'react-router-dom';

const RetailerHome = () => {
    return (
        <RetailerLayout>
            <Column lg={16}>
                <Link to='/retailer/letsTalk'>Lets Talk</Link><br />
                <Link to='/retailer/faq'>FAQ</Link><br />
                <Link to='/retailer/landing'>Landing</Link><br />
                <Link to='/retailer/integration'>Integration</Link>
            </Column>
        </RetailerLayout>
    );
};

export default RetailerHome;
