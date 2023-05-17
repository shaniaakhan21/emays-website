import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

// SCSS

import { Column, Heading, TextInput } from '@carbon/react';
import GeneratePassword from '../../../common/GeneratePassword';

const CreateRetailerAccountInfo = ({ setState }) => {
    const [translate] = useTranslation();

    const onChange = useCallback((e) => {
        setState((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }));
    }, [setState]);

    const t = useCallback((key) => translate(`dashboard.adminTools.createRetailer.account.${key}`), [translate]);

    return (
        <Column lg={16} md={16} sm={8} xs={8}>
            <div className='grid-3'>
                <div className='em-card'>
                    <Heading className='sub-title'>{t('sub-title')}</Heading>
                    {[
                        'username',
                        'email'
                    ].map((item, idx) => (<TextInput key={idx} labelText={t(item)} onChange={onChange} id={item} />))}
                    <GeneratePassword />
                </div>
            </div>
        </Column>
    );
};

export default React.memo(CreateRetailerAccountInfo);
