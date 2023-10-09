import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// SCSS

import { Button, Column, FileUploaderDropContainer, Grid, Heading, TextArea, TextInput } from '@carbon/react';

const CompletedMessage = ({ setState }) => {
    const [translate] = useTranslation();

    useEffect(() => {
        setState({});
    });

    const t = useCallback((key) => translate(`dashboard.adminTools.createRetailer.completed.${key}`), [translate]);

    return (
        <>
            <Column lg={16} md={16} sm={16} xs={16}>
                <div>
                    <div className='em-card'>
                        <Heading className='sub-title'>{t('sub-title')}</Heading>
                        <br></br>
                        <h4>{t('successMessage')}</h4>
                    </div>
                </div>
            </Column>
        </>
    );
};

export default React.memo(CompletedMessage);
