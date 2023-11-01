import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

// SCSS
import '../../../../scss/component/dashboard/adminTools/createDriver.scss';
import { Button, Column, Grid, Heading, ProgressIndicator, ProgressStep, Row } from '@carbon/react';
import { Taxi, ArrowRight } from '@carbon/icons-react';
import CreateDriverBasicInfo from './BasicInfo.fragment';
import CreateDriverDocuments from './Documents.fragment';
import CreateDriverBillingInformation from './BillingInformation.fragment';
import { validateObjectNullEmptyCheck } from '../../../../js/util/validateObject';
import { setStageOneCreateDriver } from '../../redux/thunk/newDriverThunk';
import { useDispatch, useSelector } from 'react-redux';
import { newDriverSelectorMemoized } from '../../redux/selector/newDriverSelector';

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

    const handleNext = useCallback(() => {
        if (step < 5) {
            if (step === 0) {
                const result = validateObjectNullEmptyCheck(state, ['']);
                if (result[0]) {
                    setErrorState(null);
                    dispatch(setStageOneCreateDriver(state));
                } else {
                    setErrorState(result[1]);
                }
            } else if (step === 1) {

            } else if (step === 2) {

            }
        }
    }, [step, state]);

    const goBack = async () => {
        if (step === 3) {
            await dispatch(resetIsLoadingPhaseThree());
        } else if (step === 2) {
            await dispatch(resetIsLoadingPhaseTwo());
        } else if (step === 1) {
            await dispatch(resetIsLoadingPhaseOne());
        }
        setStep((s) => s - 1);
    };

    useEffect(() => {
        setErrorState('');
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
                {
                    (step !== 0) && 
                    <Button kind='tertiary' className='back' onClick={goBack}>Back</Button>
                }
                {
                    (step !== 2) && 
                    <Button className='next' onClick={handleNext} renderIcon={() => <ArrowRight />}>Next</Button>
                }
            </Grid>
        </div>
    );
};

export default React.memo(CreateDriver);
