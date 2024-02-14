import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

// SCSS
import '../../../scss/component/dashboard/adminTools/adminTools.scss';
import { Link } from 'react-router-dom';
import { Button, Heading } from '@carbon/react';
import { Store, Add, Taxi } from '@carbon/icons-react';

const AdminTools = () => {
    const [translate] = useTranslation();

    const t = useCallback((key) => translate(`dashboard.adminTools.${key}`), [translate]);

    return (
        <div className='adminTools'>
            <div className='em-card'>
                <Store />
                <Heading className='title'>{t('add-store-title')}</Heading>
                <Heading className='sub-title'>{t('add-store-subtitle')}</Heading>
                <Link to='createRetailer'>
                    <Button renderIcon={() => <Add />} className='button'>{t('add-store-button')}</Button>
                </Link>
            </div>
            <div className='em-card'>
                <Taxi />
                <Heading className='title'>{t('add-driver-title')}</Heading>
                <Heading className='sub-title'>{t('add-driver-subtitle')}</Heading>
                <Link to='createDriver'>
                    <Button renderIcon={() => <Add />} className='button'>{t('add-driver-button')}</Button>
                </Link>
            </div>
        </div>
    );
};

export default React.memo(AdminTools);
