import { Column } from '@carbon/react';

// Components
import RetailerLayout from '../common/RetailerLayout';
import FAQForm from '../common/FAQForm';

const RetailerFAQs = () => {
    return (
        <RetailerLayout>
            <Column lg={16} md={8} sm={4} xs={4}>
                <FAQForm />
            </Column>
        </RetailerLayout>
    );
};

export default RetailerFAQs;