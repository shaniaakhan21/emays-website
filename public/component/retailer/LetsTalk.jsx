import { Column } from '@carbon/react';

// Components
import RetailerLayout from '../common/RetailerLayout';
import LetsTalkForm from '../common/LetsTalkForm';

const RetailerLetsTalk = () => {
    return (
        <RetailerLayout>
            <Column lg={16} md={8} sm={4} xs={4}>
                <LetsTalkForm onSubmit={(d) => console.log('dddd', d)} />
            </Column>
        </RetailerLayout>
    );
};

export default RetailerLetsTalk;
