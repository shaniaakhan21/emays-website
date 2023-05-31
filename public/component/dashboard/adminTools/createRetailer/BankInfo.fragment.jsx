import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

// SCSS

import { Column, Dropdown, Heading, TextInput } from '@carbon/react';

const CreateRetailerBankInfo = ({ setState }) => {
    const [translate] = useTranslation();

    const onChange = useCallback((e) => {
        setState((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }));
    }, [setState]);

    const t = useCallback((key) => translate(`dashboard.adminTools.createRetailer.billing.${key}`), [translate]);

    return (
        <>
            <Column lg={5} md={4} sm={8} xs={8}>
                <div className='em-card'>
                    <Heading className='sub-title'>{t('sub-title')}</Heading>
                    {[
                        'address',
                        'email'
                    ].map((item, idx) => (<TextInput key={idx} labelText={t(item)} onChange={onChange} id={item} />))}
                </div>
            </Column>
            <Column lg={11} md={4} sm={8} xs={8}>
                <div className='em-card'>
                    <Heading className='sub-title'>{t('sub-title2')}</Heading>
                    <div className='grid-2'>
                        {[
                            'bank',
                            'swift',
                            'account',
                            'country'
                        ].map((item, idx) => (
                            <TextInput key={idx} labelText={t(item)} onChange={onChange} id={item} />
                        ))}
                        <Dropdown
                            type='inline'
                            id='paymentCurrency'
                            items={[]}
                            label={t('paymentCurrency-label')}
                            titleText={t('paymentCurrency')}
                        />
                    </div>
                </div>
            </Column>
        </>
    );
};

export default React.memo(CreateRetailerBankInfo);
