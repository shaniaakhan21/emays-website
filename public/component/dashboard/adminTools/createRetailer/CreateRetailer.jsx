import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

// SCSS
import '../../../../scss/component/dashboard/adminTools/createRetailer.scss';

const CreateRetailer = () => {
    const [translate] = useTranslation();

    const t = useCallback((key) => translate(`dashboard.adminTools.createRetailer.${key}`), [translate]);

    return (
        <div className='createRetailer'>

        </div>
    );
};

export default React.memo(CreateRetailer);
