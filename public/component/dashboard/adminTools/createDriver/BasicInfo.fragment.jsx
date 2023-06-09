import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

// SCSS

import { Column, Heading, TextInput } from '@carbon/react';

const CreateDriverBasicInfo = ({ setState }) => {
    const [translate] = useTranslation();

    const onChange = useCallback((e) => {
        setState((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }));
    }, [setState]);

    const t = useCallback((key) => translate(`dashboard.adminTools.createDriver.basic.${key}`), [translate]);

    return (
        <Column className='em-card' lg={5} md={4} sm={4} xs={4}>
            <div className='em-card'>
                <Heading className='sub-title'>{t('sub-title')}</Heading>
                {[
                    'name',
                    'lastname',
                    'phone',
                    'city',
                    'country',
                    'zip'
                ].map((item, idx) => (<TextInput key={idx} labelText={t(item)} onChange={onChange} id={item} />))}
            </div>
        </Column>
    );
};

export default React.memo(CreateDriverBasicInfo);
