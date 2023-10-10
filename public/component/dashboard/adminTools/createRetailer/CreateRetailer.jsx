import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Store, ArrowRight } from '@carbon/icons-react';
import { Button, Grid, ProgressIndicator, ProgressStep } from '@carbon/react';

// SCSS
import '../../../../scss/component/dashboard/adminTools/createRetailer.scss';
import CreateRetailerBasicInfo from './BasicInfo.fragment';
import CreateRetailerBankInfo from './BankInfo.fragment';
import CreateRetailerEmployeeInfo from './EmployeeInfo.fragment';
import CreateRetailerAccountInfo from './AccountInfo.fragment';
import CreateRetailerNotes from './Notes.fragment';
import { checkUsernameValidity, setStageOneCreateStore,
    setStageThreeCreateStore, setStageTwoCreateStore } from '../../redux/thunk/adminThunk';
import { useDispatch, useSelector } from 'react-redux';
import { newStoreSelectorMemoized } from '../../redux/selector/newStorSelector';
import CompletedMessageFragment from './Completed.message.fragment';

const CreateRetailer = () => {
    const [translate] = useTranslation();
    const [step, setStep] = useState(0);
    const [state, setState] = useState({});

    const dispatch = useDispatch();
    const selector = useSelector(newStoreSelectorMemoized);

    const handleNext = async () => {
        if (step < 5) {
            if (step === 0) {
                dispatch(setStageOneCreateStore(state));

            } else if (step === 1) {
                const usernameBusinessAdminAvailability = 
                await checkUsernameValidity({ username: state?.businessAdmin?.username });
                const usernameManagerAvailability = 
                await checkUsernameValidity({ username: state?.manager?.username });
                if (usernameBusinessAdminAvailability.status && usernameManagerAvailability.status) {
                    dispatch(setStageTwoCreateStore(state));
                }
            } else if (step === 2) {
                const usernameSystemAvailability = 
                await checkUsernameValidity({ username: state?.username });
                if (usernameSystemAvailability.status) {
                    dispatch(setStageThreeCreateStore(state));
                }
            } else if (step === 3) {
                dispatch(setStageOneCreateStore({}));
                dispatch(setStageTwoCreateStore({}));
                dispatch(setStageThreeCreateStore({}));
            }
        }
    };

    useEffect(() => {
        if (!selector?.phaseThreeData?.isLoading) {
            setStep(3);
            setState({});
        } else if (!selector?.phaseTwoData?.isLoading) {
            setStep(2);
            setState({});
        }
        else if (!selector?.phaseOneData?.isLoading) {
            setStep(1);
            setState({});
        }
    }, [selector]);

    const t = useCallback((key) => translate(`dashboard.adminTools.createRetailer.${key}`), [translate]);

    return (
        <div className='createRetailer'>
            <div className='banner'>
                <Store className='icon' />
                <div className='title'>{t('banner')}</div>
            </div>
            <ProgressIndicator>
                {[
                    'Basic Info',
                    'Members',
                    'User & Password',
                    'Summery'
                ].map((item, index) => (<ProgressStep
                    key={index}
                    complete={step > index}
                    current={step === index}
                    label={item}
                />))}
            </ProgressIndicator>
            <Grid className='content'>
                {step === 0 ? <CreateRetailerBasicInfo setState={setState} /> : null}
                {step === 1 ? <CreateRetailerEmployeeInfo setState={setState} /> : null}
                {step === 2 ? <CreateRetailerAccountInfo setState={setState} /> : null}
                {/* {step === 3 ? <CreateRetailerNotes setState={setState} /> : null} */}
                {step === 3 ? <CompletedMessageFragment setState={setState} /> : null}
                
                {
                    (step !== 0) && 
                    <Button kind='tertiary' className='back' onClick={() => setStep(s => s - 1)}>Back</Button>
                }
                {
                    (step !== 3) && 
                    <Button className='next' onClick={handleNext} renderIcon={() => <ArrowRight />}>Next</Button>
                }
            </Grid>
        </div>
    );
};

export default React.memo(CreateRetailer);
