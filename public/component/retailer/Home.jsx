import { Column } from '@carbon/react';

// Components
import RetailerLayout from '../common/RetailerLayout';
import { Link } from 'react-router-dom';

const RetailerHome = () => {
    return (
        <RetailerLayout>
            <Column lg={16}>
                <Link to='/retailer/letsTalk'>Lets Talk</Link>
                <Link to='/retailer/faq'>FAQ</Link>
            </Column>
        </RetailerLayout>
    );
};

export default RetailerHome;
