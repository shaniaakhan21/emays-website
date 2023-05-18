import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

// SCSS

import { Button, Column, FileUploaderDropContainer, Grid, Heading, TextArea, TextInput } from '@carbon/react';
import GoogleMap from '../../../common/googleMap';

const CreateRetailerNotes = ({ setState }) => {
    const [translate] = useTranslation();

    const onChange = useCallback((e) => {
        setState((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }));
    }, [setState]);

    const t = useCallback((key) => translate(`dashboard.adminTools.createRetailer.notes.${key}`), [translate]);

    return (
        <>
            <Column lg={16} md={8} sm={4} xs={4}>
                <div className='grid-3'>
                    <div>
                        <div className='em-card'>
                            <Heading className='sub-title'>{t('sub-title')}</Heading>
                            <TextArea
                                labelText={t('notes')}
                                onChange={onChange}
                                id='notes'
                                helperText={t('notes-help')}
                            />
                            <Button className='mt-1 flow'>{t('save-comment')}</Button>
                        </div>
                    </div>
                    <div>
                        <div className='em-card'>
                            <Heading className='sub-title center bold'>{t('sub-title2')}</Heading>
                            <div className='grid-2 grid-table'>
                                <div className='grid-title'>
                                    <Heading>{t('date')}</Heading>
                                </div>
                                <div className='grid-title'>
                                    <Heading>{t('event')}</Heading>
                                </div>
                                {[
                                    'Account Created',
                                    'Changed password',
                                    'Paused activity',
                                    'Deleted account'
                                ].map((item, idx) => ([
                                    <div key={`d-${idx}`}>
                                        20/1/2012
                                    </div>,
                                    <div key={`e-${idx}`}>
                                        {item}
                                    </div>
                                ]))}
                            </div>
                            <Button className='mt-1 flow'>{t('download-log')}</Button>
                        </div>
                    </div>
                    <div></div>
                </div>
                <Heading className='sub-title mt-2'>{t('sub-title3')}</Heading>
                <div className='comments'>
                    <div className='comment'>
                        <div className='date'>Date added</div>
                        <div className='data'>This is a text of example for comments
                            after saving all comments need to be shown in this space with
                            50% of container width </div>
                    </div>
                    <div className='comment'>
                        <div className='date'>Date added</div>
                        <div className='data'>This is a text of example for comments
                            after saving all comments need to be shown in this space with
                            50% of container width </div>
                    </div>
                </div>
            </Column>
        </>
    );
};

export default React.memo(CreateRetailerNotes);
