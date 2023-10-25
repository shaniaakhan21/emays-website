import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

// SCSS

import { Column, FileUploaderDropContainer, Heading, TextInput } from '@carbon/react';

const CreateDriverDocuments = ({ setState }) => {
    const [translate] = useTranslation();

    const onChange = useCallback((e) => {
        setState((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }));
    }, [setState]);

    const t = useCallback((key) => translate(`dashboard.adminTools.createDriver.documents.${key}`), [translate]);

    return (
        <>
            <Column lg={5} md={4} sm={8} xs={8}>
                <div className='em-card'>
                    <Heading className='sub-title'>{t('sub-title')}</Heading>
                    {[
                        'number',
                        'carModel',
                        'carPlate'
                    ].map((item, idx) => (<TextInput key={idx} labelText={t(item)} onChange={onChange} id={item} />))}
                </div>
            </Column>
            <Column lg={11} md={4} sm={8} xs={8}>
                <div className='em-card'>
                    <Heading className='sub-title'>
                        {t('sub-title2')}
                        &nbsp;
                        <span className='info'>{t('sub-title2-info')}</span>
                    </Heading>
                    <FileUploaderDropContainer
                        accept={[
                            'image/jpeg',
                            'image/png'
                        ]}
                        innerRef={{
                            current: '[Circular]'
                        }}
                        labelText={t('upload')}
                        multiple
                        name=''
                        onAddFiles={e => console.log('onAddFiles', e)}
                        onChange={e => console.log('onChange', e)}
                        tabIndex={0}
                    />
                </div>
            </Column>
        </>
    );
};

export default React.memo(CreateDriverDocuments);
