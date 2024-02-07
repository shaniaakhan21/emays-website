import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useMessage } from '../../../common/messageCtx';
import { Column } from '@carbon/react';
import { useDispatch, useSelector } from 'react-redux';
import { Copy } from '@carbon/icons-react';

// SCSS
import '../../../../scss/component/dashboard/adminTools/createDriverResult.scss';
import { newDriverSelectorMemoized } from '../../redux/selector/newDriverSelector';
import { resetAllDriverCreationData } from '../../redux/thunk/newDriverThunk';

const CompletedMessage = ({ setState }) => {                                                                          
    const [translate] = useTranslation();
    const dispatch = useDispatch();
    const selector = useSelector(newDriverSelectorMemoized);
    const [saved, setSaved] = useState(false);
    const [m] = useTranslation();
    const pushAlert = useMessage();
    const history = useNavigate();

    useEffect(() => {
        if (!(selector?.saveStatus?.isLoading) && (selector?.saveStatus?.result)) {
            pushAlert({
                kind: 'success',
                title: m('statusMessage.success'),
                subtitle: m('statusMessage.message.accounts-creation-success')
            });
            copyAndPushAlert();
            setTimeout(async () => {
                await dispatch(resetAllDriverCreationData());
                history.push('/dashboard/adminTools');
            }, 3000);
        }
    }, [selector]);

    const t = useCallback((key) => translate(`dashboard.adminTools.createDriver.completed.${key}`), [translate]);

    const copyAndPushAlert = () => {
        const text = `Driver Username: ${selector?.phaseFourData?.username}, 
                     Driver Password: ${selector?.phaseFourData?.password}`;     
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
                                    <h5>Username</h5>
                                    <p> {selector?.phaseFourData?.username}</p>
                                </div>
                                <div className='text'>
                                    <h5>Password</h5>
                                    <p> ******</p>
                                </div>
                                <div className='button'>
                                    <button
                                        onClick={() => { 
                                            copyAndPushAlert();
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
        </>
    );
};

export default React.memo(CompletedMessage);
