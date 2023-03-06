import { Column } from '@carbon/react';

// Components
import RetailerLayout from '../common/RetailerLayout';
import LetsTalkForm from '../common/LetsTalkForm';

const RetailerLetsTalk = () => {
    return (
        <RetailerLayout>
            <Column lg={16}>
                <LetsTalkForm onSubmit={() => {}} />
            </Column>
        </RetailerLayout>
    );
};

export default RetailerLetsTalk;
