import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

// SCSS

import { Button, Column, FileUploaderDropContainer, Grid, Heading, TextArea, TextInput } from '@carbon/react';
import { useDispatch, useSelector } from 'react-redux';
import { newStoreSelectorMemoized } from '../../redux/selector/newStorSelector';
import { registerExternalSystem } from '../../redux/thunk/adminThunk';

const CompletedMessage = ({ setState }) => {
    const [translate] = useTranslation();
    const dispatch = useDispatch();
    const selector = useSelector(newStoreSelectorMemoized);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
    }, [newStoreSelectorMemoized]);

    const handleSave = () => {
        dispatch(registerExternalSystem({
            phaseOne: selector?.phaseOneData,
            phaseThree: selector?.phaseThreeData
        }));
    };

    const t = useCallback((key) => translate(`dashboard.adminTools.createRetailer.completed.${key}`), [translate]);

    return (
        <>
            <Column lg={16} md={16} sm={16} xs={16}>
                <div>
                    { !saved && !selector?.phaseThreeData?.isLoading &&
                    <div className='em-card'>
                        <Heading className='sub-title'>{t('summery')}</Heading>
                        <br></br>
                        <h5>Shop Name:</h5>
                        <p> {selector?.phaseOneData?.storeName}</p>
                        <br></br>
                        <h5>Shop Address:</h5>
                        <p> {`${selector?.phaseOneData?.address?.addOne}, 
                            ${selector?.phaseOneData?.address?.addTwo}, 
                            ${selector?.phaseOneData?.address?.addThree}` }</p>
                        <br></br>
                        <h5>Shop Email:</h5>
                        <p> {selector?.phaseThreeData?.email}</p>
                        <br></br>
                        <h5>Username:</h5>
                        <p> {selector?.phaseThreeData?.username}</p>
                        <br></br>
                        <h5>Password:</h5>
                        <p> {selector?.phaseThreeData?.password}</p>
                        <br></br>
                        <Button className='next' onClick={handleSave} >Create</Button>
                    </div>
                    }
                </div>
                <div>
                    {
                        // Success TODO: create a general component
                        !(selector?.saveStatus?.isLoading) && (selector?.saveStatus?.result === true) && 
                        <div className='em-card'>
                            <Heading className='sub-title'>{t('sub-title')}</Heading>
                            <br></br>
                            <h4>{t('successMessage')}</h4>
                        </div>
                    }

                    {   
                    // Error TODO: create a general component
                        !(selector?.saveStatus?.isLoading) && (selector?.saveStatus?.result !== true) && 
                        <div className='em-card' style={ { color: 'red' } }>
                            <Heading className='sub-title'>{t('error-header')}</Heading>
                            <br></br>
                            <h4>{selector?.saveStatus?.result?.description}</h4>
                        </div>
                    }
                </div>
            </Column>
        </>
    );
};

export default React.memo(CompletedMessage);
