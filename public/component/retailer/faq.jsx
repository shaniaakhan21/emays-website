import { Column } from '@carbon/react';

// Components
import RetailerLayout from '../common/RetailerLayout';
import FAQForm from '../common/FAQForm';

const RetailerFAQ = () => {
    return (
        <RetailerLayout>
            <Column lg={16}>
                <FAQForm />
            </Column>
        </RetailerLayout>
    );
};

export default RetailerFAQ;
