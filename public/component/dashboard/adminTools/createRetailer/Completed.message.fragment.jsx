import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useMessage } from '../../../common/messageCtx';
import { Column, Heading } from '@carbon/react';
import { useDispatch, useSelector } from 'react-redux';
import { newStoreSelectorMemoized } from '../../redux/selector/newStorSelector';
import { resetAllStoreCreationData } from '../../redux/thunk/newStoreThunk';
import { Button } from '@carbon/react';
import { Copy } from '@carbon/icons-react';

// SCSS
import '../../../../scss/component/dashboard/adminTools/createStoreResult.scss';

const CompletedMessage = ({ setState }) => {
    const [translate] = useTranslation();
    const dispatch = useDispatch();
    const selector = useSelector(newStoreSelectorMemoized);
    const [saved, setSaved] = useState(false);
    const [m] = useTranslation();
    const pushAlert = useMessage();
    const history = useHistory();

    useEffect(() => {
        if (!(selector?.saveStatus?.isLoading) && (selector?.saveStatus?.result?.resultStore?.sysId)) {
            pushAlert({
                kind: 'success',
                title: m('statusMessage.success'),
                subtitle: m('statusMessage.message.accounts-creation-success')
            });
            copyAndPushAlert();
            setTimeout(async () => {
                await dispatch(resetAllStoreCreationData());
                history.push('/dashboard/adminTools');
            }, 3000);
        }
    }, [selector]);

    const t = useCallback((key) => translate(`dashboard.adminTools.createRetailer.completed.${key}`), [translate]);

    const copyAndPushAlert = () => {
        const text = `Store Username: ${selector?.phaseOneData?.username}, 
                     Store Password: ${selector?.phaseOneData?.password}, 
                     Admin Username: ${selector?.phaseThreeData?.businessAdmin?.adminUsername}, 
                     Admin Password: ${selector?.phaseThreeData?.businessAdmin?.adminPassword}, 
                     Manager Username: ${selector?.phaseThreeData?.manager?.managerUsername}, 
                     Manager Password: ${selector?.phaseThreeData?.manager?.managerPassword}`;     
        navigator.clipboard.writeText(text);
        pushAlert({
            kind: 'success',
            title: m('statusMessage.success'),
            subtitle: m('statusMessage.message.data-copied')
        });
    };

    return (
        <>
            <Column lg={16} md={16} sm={16} xs={16}>
                <div>
                    { !saved && !selector?.phaseThreeData?.isLoading &&
                    <div className='em-card result-account-creation'>
                        <Heading className='sub-title'>{t('summery')}</Heading>
                        <br></br>
                        <div className='left'>
                            <h5>Shop Name:</h5>
                            <p> {selector?.phaseTwoData?.storeName}</p>
                            <br></br>
                            <h5>Shop Address:</h5>
                            <p> {`${selector?.phaseTwoData?.address?.addOne}, 
                            ${selector?.phaseTwoData?.address?.addTwo}, 
                            ${selector?.phaseTwoData?.address?.addThree}` }</p>
                            <br></br>
                            <h5>Shop Email:</h5>
                            <p> {selector?.phaseOneData?.email}</p>
                            <br></br>
                            <h5>Username:</h5>
                            <p> {selector?.phaseOneData?.username}</p>
                            <br></br>
                            <h5>Password:</h5>
                            <p> {'*****'}</p>
                            <br></br>
                        </div>
                        <div className='right'>
                            <h5>Admin Username:</h5>
                            <p> {selector?.phaseThreeData?.businessAdmin?.adminUsername}</p>
                            <br></br>
                            <h5>Admin Password:</h5>
                            <p> {'*****'}</p>
                            <h5>Manager Username:</h5>
                            <p> {selector?.phaseThreeData?.manager?.managerUsername}</p>
                            <br></br>
                            <h5>Manager Password:</h5>
                            <p> {'*****'}</p>
                            <br></br>
                        </div>
                        <div className='copy-button'>
                            <Button
                                onClick={() => { 
                                    copyAndPushAlert();
                                }}
                                kind={'secondary'}
                                customStyle={{
                                    minWidth: '24vw',
                                    marginTop: '25px',
                                    marginBottom: '15px',
                                    alignContent: 'center',
                                    justifyContent: 'center',
                                    padding: '1%'
                                }}
                            >
                                <Copy />
                            </Button>
                        </div>
                    </div>
                    }
                    <div>
                        {
                        // Success TODO: create a general component
                            !(selector?.saveStatus?.isLoading) && (selector?.saveStatus?.result?.resultStore?.sysId) && 
                        <div className='em-card'>
                            <Heading className='sub-title'>{t('sub-title')}</Heading>
                            <br></br>
                            <h4>{t('successMessage')}</h4>
                        </div>
                        }

                        {   
                            // Error TODO: create a general component
                            !(selector?.saveStatus?.isLoading) &&
                             (selector?.saveStatus?.result?.resultStore?.options) && 
                        <div className='em-card' style={ { color: 'red' } }>
                            <Heading className='sub-title'>{t('error.error-store')}</Heading>
                            <br></br>
                            <h4>{selector?.saveStatus?.result?.resultStore?.description}</h4>
                        </div>
                        }

                        {   
                            // Error TODO: create a general component
                            !(selector?.saveStatus?.isLoading) &&
                             (selector?.saveStatus?.result?.resultAdmin?.options) && 
                        <div className='em-card' style={ { color: 'red' } }>
                            <Heading className='sub-title'>{t('error.error-admin')}</Heading>
                            <br></br>
                            <p>{selector?.saveStatus?.result?.resultAdmin?.description}</p>
                        </div>
                        }

                        {   
                            // Error TODO: create a general component
                            !(selector?.saveStatus?.isLoading) &&
                             (selector?.saveStatus?.result?.resultManager?.options) && 
                        <div className='em-card' style={ { color: 'red' } }>
                            <Heading className='sub-title'>{t('error.error-manager')}</Heading>
                            <br></br>
                            <p>{selector?.saveStatus?.result?.resultManager?.description}</p>
                        </div>
                        }
                    </div>
                </div>
            </Column>
        </>
    );
};

export default React.memo(CompletedMessage);
