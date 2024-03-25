import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

// SCSS
import '../../../../scss/component/dashboard/adminTools/createDriver.scss';
import { Button, Column, Grid, Heading, ProgressIndicator, ProgressStep, Row } from '@carbon/react';
import { Taxi, ArrowRight } from '@carbon/icons-react';
import CreateDriverBasicInfo from './BasicInfo.fragment';
import CreateDriverDocuments from './Documents.fragment';
import CreateDriverBillingInformation from './BillingInformation.fragment';
import CreateDriverAccountInfo from './AccountInfo.fragment';
import { validateEmail, validateObjectNullEmptyCheckArray, validatePassword } from '../../../../js/util/validateObject';
import { checkUsernameValidity, registerDriver, resetIsLoadingPhaseFour,
    resetIsLoadingPhaseOne, resetIsLoadingPhaseThree,
    resetIsLoadingPhaseTwo, setStageFourCreateDriver, setStageOneCreateDriver, setStageThreeCreateDriver,
    setStageTwoCreateDriver } from '../../redux/thunk/newDriverThunk';
import { useDispatch, useSelector } from 'react-redux';
import { newDriverSelectorMemoized } from '../../redux/selector/newDriverSelector';
import CompletedMessage from './Completed.message.fragment';
/*
 * Const CreateDriverBasicInfo = React.lazy(() => import('./BasicInfo.fragment'));
 * Const CreateDriverDocuments = React.lazy(() => import('./Documents.fragment'));
 */

const CreateDriver = () => {
    const [translate] = useTranslation();
    const [step, setStep] = useState(0);
    const [state, setState] = useState({});
    const [errorState, setErrorState] = useState(null);
    const dispatch = useDispatch();
    const selector = useSelector(newDriverSelectorMemoized);

    const handleNext = useCallback( async () => {
        console.log('Step', step);
        if (step < 5) {
            if (step === 0) {
                const result = validateObjectNullEmptyCheckArray(state, ['']);
                if (result[0]) {
                    setErrorState(null);
                    dispatch(setStageOneCreateDriver(state));
                } else {
                    setErrorState(result[1]);
                }
            } else if (step === 1) {
                const result = validateObjectNullEmptyCheckArray(state, ['']);
                if (result[0]) {
                    setErrorState(null);
                    dispatch(setStageTwoCreateDriver(state));
                } else {
                    setErrorState(result[1]);
                }
            } else if (step === 2) {
                const result = validateObjectNullEmptyCheckArray(state, ['']);
                if (result[0]) {
                    setErrorState(null);
                    const isValidAccountEmail = validateEmail(state?.billingEmail);
                    if (!isValidAccountEmail) {
                        setErrorState('billingEmailInvalid');
                        return;
                    }
                    setErrorState(null);
                    dispatch(setStageThreeCreateDriver(state));
                } else {
                    setErrorState(result[1]);
                }
            } else if (step === 3) {
                const result = validateObjectNullEmptyCheckArray(state, ['']);
                if (result[0]) {
                    const usernameDriverAvailability = 
                        await checkUsernameValidity({ username: state?.username });
                    if (usernameDriverAvailability.status) {
                        // Check password
                        const isValidPassword = validatePassword(state?.password);
                        if (!isValidPassword) {
                            setErrorState('passwordInvalid');
                            return;
                        }
                        // Check email
                        const isValidEmail = validateEmail(state?.email);
                        if (!isValidEmail) {
                            setErrorState('emailInvalid');
                            return;
                        }
                        setErrorState(null);
                        dispatch(setStageFourCreateDriver(state));
                    } else {
                        setErrorState(usernameDriverAvailability?.error);
                    }
                } else {
                    setErrorState(result[1]);
                }
            }
        }
    }, [step, state]);

    const goBack = async () => {
        if (step === 4) {
            setState({});
            setStep((s) => s - 1);
        } else if (step === 3) {
            await dispatch(resetIsLoadingPhaseFour());
            setState({});
            setStep((s) => s - 1);
        } else if (step === 2) {
            await dispatch(resetIsLoadingPhaseThree());
            setState({});
            setStep((s) => s - 1);
        } else if (step === 1) {
            await dispatch(resetIsLoadingPhaseTwo());
            setState({});
            setStep((s) => s - 1);
        } else if (step === 0) {
            await dispatch(resetIsLoadingPhaseOne());
            setState({});
            setStep((s) => s - 1);
        }
    };

    const handleSave = () => {
        dispatch(registerDriver({
            phaseOneData: selector?.phaseOneData,
            phaseTwoData: selector?.phaseTwoData,
            phaseThreeData: selector?.phaseThreeData,
            phaseFourData: selector?.phaseFourData
        }));
    };

    useEffect(() => {
        setErrorState('');
        if (!selector?.phaseFourData?.isLoading) {
            setStep(4);
            setState({});
        } else if (!selector?.phaseThreeData?.isLoading) {
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

    const t = useCallback((key) => translate(`dashboard.adminTools.createDriver.${key}`), [translate]);

    return (
        <div className='createDriver'>
            <div className='banner'>
                <Taxi className='icon' />
                <div className='title'>{t('banner')}</div>
            </div>
            <ProgressIndicator>
                {[
                    'Basic Info',
                    'Documents',
                    'Billing Information',
                    'User & Password',
                    'Notes'
                ].map((item, index) => (<ProgressStep
                    key={index}
                    complete={step > index}
                    current={step === index}
                    label={item}
                />))}
            </ProgressIndicator>
            <Grid className='content'>
                {step === 0 ? <CreateDriverBasicInfo setState={setState} errorState={errorState}/> : null}
                {step === 1 ? <CreateDriverDocuments setState={setState} errorState={errorState}/> : null}
                {step === 2 ? <CreateDriverBillingInformation setState={setState} errorState={errorState}/> : null}
                {step === 3 ? <CreateDriverAccountInfo setState={setState} errorState={errorState}/> : null}
                {step === 4 ? <CompletedMessage setState={setState} errorState={errorState}/> : null}
                {
                    (step !== 0) && 
                    <Button kind='tertiary' className='back' onClick={goBack}>Back</Button>
                }
                {
                    (step !== 4) && 
                    <Button className='next' onClick={handleNext} renderIcon={() => <ArrowRight />}>Next</Button>
                }
                {
                    (step === 4) && 
                    <Button className='next' onClick={handleSave} >Create</Button>
                }
            </Grid>
        </div>
    );
};

export default React.memo(CreateDriver);
