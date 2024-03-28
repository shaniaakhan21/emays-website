import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Store, ArrowRight } from '@carbon/icons-react';
import { Button, Grid, ProgressIndicator, ProgressStep } from '@carbon/react';
import CreateRetailerBasicInfo from './BasicInfo.fragment';
import CreateRetailerFiscalInfo from './FiscalInfo.fragment';
import CreateRetailerEmployeeInfo from './EmployeeInfo.fragment';
import CreateRetailerAccountInfo from './AccountInfo.fragment';
import { checkUsernameValidity, registerExternalSystem, resetIsLoadingPhaseFour,
    resetIsLoadingPhaseOne, resetIsLoadingPhaseThree,
    resetIsLoadingPhaseTwo, resetIsLoadingPhaseTwoFiscal, setStageOneCreateStore,
    setStageThreeCreateStore, setStageTwoCreateStore,
    setStageTwoFiscalCreateStore } from '../../redux/thunk/newStoreThunk';
import { useDispatch, useSelector } from 'react-redux';
import { newStoreSelectorMemoized } from '../../redux/selector/newStorSelector';
import CompletedMessageFragment from './Completed.message.fragment';
import { validateEmail,
    validateObjectNullEmptyCheckArray, validatePassword,
    validateStripeAccountId } from '../../../../js/util/validateObject';

// SCSS
import '../../../../scss/component/dashboard/adminTools/createRetailer.scss';
import { validateFiscal } from '../../../../services/validate';

const CreateRetailer = () => {
    const [translate] = useTranslation();
    const [step, setStep] = useState(0);
    const [state, setState] = useState({});
    const [errorState, setErrorState] = useState(null);

    const dispatch = useDispatch();
    const selector = useSelector(newStoreSelectorMemoized);

    const handleNext = async () => {
        if (step < 5) {
            if (step === 0) {
                const resultError = validateObjectNullEmptyCheckArray(state, []);
                if (resultError[0]) {
                    const usernameSystemAvailability = 
                await checkUsernameValidity({ username: state?.username });
                    if (usernameSystemAvailability.status) {
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
                        dispatch(setStageOneCreateStore(state));
                    } else {
                        setErrorState(usernameSystemAvailability?.error);
                    }
                } else {
                    setErrorState(resultError[1]);
                }

            } else if (step === 1) {
                const result = validateObjectNullEmptyCheckArray(state, ['address.addSix']);
                if (result[0]) {
                    setErrorState(null);
                    dispatch(setStageTwoCreateStore(state));
                } else {
                    setErrorState(result[1]);
                }
            } else if (step === 2) {
                const result = validateObjectNullEmptyCheckArray(state, []);
                if (result[0]) {
                    setErrorState(null);
                    // Validate fiscal number
                    const fiscalValidation = await validateFiscal(state?.fiscalNumber);
                    if (!fiscalValidation?.valid) {
                        setErrorState('fiscalValidationFailed');
                        return;
                    }
                    // Stripe Id
                    const stripeAccountValidity = validateStripeAccountId(state?.extStripeAccountId);
                    console.log('-----<>>>', stripeAccountValidity);
                    if (!stripeAccountValidity) {
                        setErrorState('stripeAccountIdInvalid');
                        return;
                    }
                    dispatch(setStageTwoFiscalCreateStore(state));
                } else {
                    setErrorState(result[1]);
                }
            } else if (step === 3) {

                const result = validateObjectNullEmptyCheckArray(state, []);
                if (result[0]) {
                    if (state?.businessAdmin?.adminUsername === state?.manager?.managerUsername) {
                        setErrorState('adminUsernameReserved');
                        return;
                    }
                    const usernameBusinessAdminAvailability = 
                        await checkUsernameValidity({ username: state?.businessAdmin?.adminUsername });
                    const usernameManagerAvailability = 
                        await checkUsernameValidity({ username: state?.manager?.managerUsername });
                    if (usernameBusinessAdminAvailability.status && usernameManagerAvailability.status) {
                        // Check password
                        const isValidManagerPassword = validatePassword(state?.manager?.managerPassword);
                        if (!isValidManagerPassword) {
                            setErrorState('passwordInvalidManager');
                            return;
                        }
                        const isValidAdminPassword = validatePassword(state?.businessAdmin?.adminPassword);
                        if (!isValidAdminPassword) {
                            setErrorState('passwordInvalidAdmin');
                            return;
                        }
                        // Check email Admin
                        const isValidEmailAdmin = validateEmail(state?.businessAdmin?.adminEmail);
                        if (!isValidEmailAdmin) {
                            setErrorState('emailInvalidAdmin');
                            return;
                        }
                        // Check email Manager
                        const isValidEmailManager = validateEmail(state?.manager?.managerEmail);
                        if (!isValidEmailManager) {
                            setErrorState('emailInvalidManager');
                            return;
                        }
                        setErrorState(null);
                        dispatch(setStageThreeCreateStore(state));
                    }
                    if (!usernameBusinessAdminAvailability.status) {
                        setErrorState(usernameBusinessAdminAvailability?.error);
                    }
                    if (!usernameManagerAvailability.status) {
                        setErrorState(usernameManagerAvailability?.error);
                    }
                } else {
                    setErrorState(result[1]);
                }
            }
        }
    };

    useEffect(() => {
        setErrorState('');
        if (!selector?.phaseThreeData?.isLoading) {
            setStep(4);
            setState({});
        } else if (!selector?.phaseTwoFiscalData?.isLoading) {
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

    const goBack = async () => {
        if (step === 4) {
            await dispatch(resetIsLoadingPhaseFour());
            setState({});
            setStep((s) => s - 1);
        } else if (step === 3) {
            await dispatch(resetIsLoadingPhaseThree());
            setState({});
            setStep((s) => s - 1);
        } else if (step === 2) {
            await dispatch(resetIsLoadingPhaseTwoFiscal());
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
        dispatch(registerExternalSystem({
            phaseOne: selector?.phaseOneData,
            phaseThree: selector?.phaseThreeData,
            phaseTwo: selector?.phaseTwoData,
            phaseTwoFiscal: selector?.phaseTwoFiscalData
        }));
    };

    const t = useCallback((key) => translate(`dashboard.adminTools.createRetailer.${key}`), [translate]);

    return (
        <div className='createRetailer'>
            <div className='banner'>
                <Store className='icon' />
                <div className='title'>{t('banner')}</div>
            </div>
            <ProgressIndicator>
                {[
                    'Account',
                    'Basic Info',
                    'Fiscal Info',
                    'Directory',
                    'Summary'
                ].map((item, index) => (<ProgressStep
                    key={index}
                    complete={(step) > index}
                    current={(step) === index}
                    label={item}
                />))}
            </ProgressIndicator>
            <Grid className='content'>
                {step === 0 ? <CreateRetailerAccountInfo setState={setState} errorState={errorState}/> : null}
                {step === 1 ? <CreateRetailerBasicInfo setState={setState} errorState={errorState} /> : null}
                {step === 2 ? <CreateRetailerFiscalInfo setState={setState} errorState={errorState} /> : null}
                {step === 3 ? <CreateRetailerEmployeeInfo setState={setState} errorState={errorState} /> : null}
                {/* {step === 3 ? <CreateRetailerNotes setState={setState} /> : null} */}
                {step === 4 ? <CompletedMessageFragment setState={setState} /> : null}
                
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

export default React.memo(CreateRetailer);
