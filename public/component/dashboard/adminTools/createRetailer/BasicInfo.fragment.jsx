import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

// SCSS

import { Column, FileUploaderDropContainer, Grid, Heading, TextInput } from '@carbon/react';
import GoogleMap from '../../../common/googleMap';

const CreateRetailerBasicInfo = ({ setState }) => {
    const [translate] = useTranslation();

    const onChange = useCallback((e) => {
        setState((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }));
    }, [setState]);

    const t = useCallback((key) => translate(`dashboard.adminTools.createRetailer.basic.${key}`), [translate]);

    return (
        <>
            <Column lg={5} md={4} sm={4} xs={4}>
                <div className='em-card'>
                    <Heading className='sub-title'>{t('sub-title')}</Heading>
                    <TextInput labelText={t('name')} onChange={onChange} id='name' />
                    <Heading className='sub-title'>{t('sub-title2')}</Heading>
                    {[
                        'street',
                        'number',
                        'city',
                        'country',
                        'zip'
                    ].map((item, idx) => (<TextInput key={idx} labelText={t(item)} onChange={onChange} id={item} />))}
                </div>
            </Column>
            <Column lg={11} md={4} sm={4} xs={4}>
                <div className='em-card'>
                    <div className='grid-2'>
                        <div>
                            <Heading className='sub-title'>{t('sub-title3')}</Heading>
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
                        <div className='preview'>
                            <Heading className='sub-title'>{t('sub-title4')}</Heading>
                            <img src='https://via.placeholder.com/150' alt='preview' />
                        </div>
                    </div>
                    <Heading className='sub-title'>{t('sub-title5')}</Heading>
                    <div className='map'>
                        <GoogleMap />
                    </div>
                </div>
            </Column>
        </>
    );
};

export default React.memo(CreateRetailerBasicInfo);
