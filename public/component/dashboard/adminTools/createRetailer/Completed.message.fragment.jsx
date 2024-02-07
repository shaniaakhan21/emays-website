import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    const history = useNavigate();

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

    const copyStoreAndPushAlert = () => {
        const text = `Store Username: ${selector?.phaseOneData?.username}, 
                     Store Password: ${selector?.phaseOneData?.password}`;     
        navigator.clipboard.writeText(text);
        pushAlert({
            kind: 'success',
            title: m('statusMessage.success'),
            subtitle: m('statusMessage.message.data-copied')
        });
    };

    const copyManagerAndPushAlert = () => {
        const text = `Manager Username: ${selector?.phaseThreeData?.manager?.managerUsername}, 
                     Manager Password: ${selector?.phaseThreeData?.manager?.managerPassword}`;     
        navigator.clipboard.writeText(text);
        pushAlert({
            kind: 'success',
            title: m('statusMessage.success'),
            subtitle: m('statusMessage.message.data-copied')
        });
    };

    const copyAdminAndPushAlert = () => {
        const text = `Admin Username: ${selector?.phaseThreeData?.businessAdmin?.adminUsername}, 
                     Admin Password: ${selector?.phaseThreeData?.businessAdmin?.adminPassword}`;     
        navigator.clipboard.writeText(text);
        pushAlert({
            kind: 'success',
            title: m('statusMessage.success'),
            subtitle: m('statusMessage.message.data-copied')
        });
    };

    return (
        <>
            <Column className={'info'} lg={16} md={16} sm={16} xs={16}>
                <div className='container'>
                    {
                        !saved && !selector?.phaseThreeData?.isLoading &&
                            <div className='em-card result-account-creation'>
                                <div className='text'>
                                    <h5>Store Account</h5>
                                    <p> {selector?.phaseOneData?.username}</p>
                                </div>
                                <div className='text'>
                                    <h5>Password</h5>
                                    <p> ******</p>
                                </div>
                                <div className='button'>
                                    <button
                                        onClick={() => { 
                                            copyStoreAndPushAlert();
                                        }}
                                        className='button-copy'
                                    >Copy
                                        <Copy style={{ 'marginLeft': '35px' }}/>
                                    </button>
                                </div>
                                
                            </div>
                    } 
                </div>
            </Column>
            <Column className={'info'} lg={16} md={16} sm={16} xs={16}>
                <div className='container'>
                    {
                        !saved && !selector?.phaseThreeData?.isLoading &&
                            <div className='em-card result-account-creation'>
                                <div className='text'>
                                    <h5>Store Manager Account</h5>
                                    <p> {selector?.phaseThreeData?.manager?.managerUsername}</p>
                                </div>
                                <div className='text'>
                                    <h5>Password</h5>
                                    <p> ******</p>
                                </div>
                                <div className='button'>
                                    <button
                                        onClick={() => { 
                                            copyManagerAndPushAlert();
                                        }}
                                        className='button-copy'
                                    >Copy
                                        <Copy style={{ 'marginLeft': '35px' }}/>
                                    </button>
                                </div>
                                
                            </div>
                    } 
                </div>
            </Column>
            <Column className={'info'} lg={16} md={16} sm={16} xs={16}>
                <div className='container'>
                    {
                        !saved && !selector?.phaseThreeData?.isLoading &&
                            <div className='em-card result-account-creation'>
                                <div className='text'>
                                    <h5>Store Admin Account</h5>
                                    <p> {selector?.phaseThreeData?.businessAdmin?.adminUsername}</p>
                                </div>
                                <div className='text'>
                                    <h5>Password</h5>
                                    <p> ******</p>
                                </div>
                                <div className='button'>
                                    <button
                                        onClick={() => { 
                                            copyAdminAndPushAlert();
                                        }}
                                        className='button-copy'
                                    >Copy
                                        <Copy style={{ 'marginLeft': '35px' }}/>
                                    </button>
                                </div>
                                
                            </div>
                    } 
                </div>
            </Column>
            {

                <Column className={'info'} lg={16} md={16} sm={16} xs={16}>
                    <div className='container'>
                        {
                            !(selector?.saveStatus?.isLoading) &&
                            (selector?.saveStatus?.result?.resultManager?.options) &&
                            <div className='em-card' style={{ color: 'red' }}>
                                <Heading className='sub-title'>{t('error.error-manager')}</Heading>
                                <br></br>
                                <p>{selector?.saveStatus?.result?.resultManager?.description}</p>
                            </div>
                        }
                    </div>
                </Column>
            }
        </>
    );
};

export default React.memo(CompletedMessage);
