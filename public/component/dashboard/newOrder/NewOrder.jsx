import React, { useCallback, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Heading, Button } from '@carbon/react';
import DatePickerCustom from '../../common/DatePickerCustom';
import DropDownCustom from '../../common/DropdownCustom';
import timeframes from '../../../../app/const/timeframes';
import TextBoxCustom from '../../common/TextBoxCustom';
import TextAreaCustom from '../../common/TextAreaCustom';
// Scss
import '../../../scss/component/retailer/newOrders.scss';

const NewOrder = () => {
    const [translate] = useTranslation();
    const history = useHistory();
    const t = useCallback((key) => translate(`dashboard.newOrders.${key}`), [translate]);
    const dateRef = useRef();
    const timeRef = useRef();
    const fNameRef = useRef();
    const lNameRef = useRef();
    const emailRef = useRef();
    const contactRef = useRef();
    const addressRef = useRef();
    const cityRef = useRef();
    const apartmentNoRef = useRef();
    const zipRef = useRef();

    const [formCommitted, setFormCommitStatus] = useState(false);
    const [formData, setFormData] = useState({});

    const checkObject = (formData) => {
        for (const key in formData) {
            if (formData.hasOwnProperty(key)) {
                console.log('Key---', key);
                const value = formData[key];
                if (!value) {
                    return false;
                }
            }
        }
        return true;
    };

    const submitForm = () => {
        console.log(dateRef.current);
        // const data = {
        //     date: dateRef.current.value || '',
        //     time: timeRef.current.value || '',
        //     fName: fNameRef.current.value || '',
        //     lName: lNameRef.current.value || '',
        //     email: emailRef.current.value || '',
        //     contact: contactRef.current.value || '',
        //     address: addressRef.current.value || '',
        //     city: cityRef.current.value || '',
        //     apartmentNo: apartmentNoRef.current.value || '',
        //     zip: zipRef.current.value || ''
        // };
        // setFormData(data);
        // setFormCommitStatus(true);
        // if (checkObject(formData)) {
        //     history.push('/dashboard/deliveryOrders');
        // }
    };

    return (
        <>
            <div className='newOrders'>
                <div className='header'>
                    <Heading className='title'>{t('title')}</Heading>
                    <Heading className='sub-title'>{t('sub-title')}</Heading>
                </div>
                <br></br>
                <br></br>
                <div className='main-layout'>
                    <div className='sub-main-layout'>
                        <div className='layout-sections'>
                            <div className='date'>
                                <div>
                                    <p>{t('delivery-day-date')}</p>
                                    <DatePickerCustom ref={dateRef} />
                                    <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                                Please select a date</span>
                                </div>
                            </div>
                            <div className='date'>
                                <div>
                                    <p>{t('delivery-time')}</p>
                                    <DropDownCustom
                                        ref={timeRef}
                                        items={
                                            timeframes?.map((tf, k) => ({ id: k, text: `${tf.start} to ${tf.end}` 
                                            }))}
                                    />
                                    {(formCommitted && !formData?.time) && 
                                        <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                                Please select a time frame</span>}
                                </div>
                            </div>
                        </div>
                        <br></br>
                        <br></br>
                        <div className='layout-sections start-it'>
                            <br></br>
                            <div className='full-width'>
                                <div>
                                    <p className='sub-text'>{t('sub-head-01')}</p>
                                </div>
                                <div className='textboxes-sec'>
                                    <div className='half-width'>
                                        <br></br>
                                        <p className='sub-title'>{t('text-box-01')}</p>
                                        <div>
                                            <TextBoxCustom
                                                ref={fNameRef}
                                                placeholderText={t('Place-holder-01')} />
                                            <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                                Please provide first name</span>
                                        </div>
                                        <br></br>
                                        <p className='sub-title'>{t('text-box-02')}</p>
                                        <div>
                                            <TextBoxCustom
                                                ref={contactRef}
                                                placeholderText={t('Place-holder-02')} />
                                            <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                                Please provide contact number</span>
                                        </div>
                                    </div>
                                    <div className='half-width'>
                                        <br></br>
                                        <p className='sub-title'>{t('text-box-03')}</p>
                                        <div>
                                            <TextBoxCustom
                                                ref={lNameRef}
                                                placeholderText={t('Place-holder-03')} />
                                            <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                                Please provide last name</span>
                                        </div>
                                        <br></br>
                                        <p className='sub-title'>{t('text-box-04')}</p>
                                        <div>
                                            <TextBoxCustom
                                                ref={emailRef}
                                                placeholderText={t('Place-holder-04')} />
                                            <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                                Please provide email</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br></br>
                        <br></br>
                        <div className='layout-sections start-it'>
                            <br></br>
                            <div className='full-width'>
                                <div>
                                    <p className='sub-text'>{t('sub-head-02')}</p>
                                </div>
                                <div className='textboxes-sec'>
                                    <div className='half-width'>
                                        <br></br>
                                        <p className='sub-title'>{t('text-box-05')}</p>
                                        <div>
                                            <TextBoxCustom
                                                ref={addressRef}
                                                placeholderText={t('Place-holder-05')} />
                                            <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                                Please provide address</span>
                                        </div>
                                        <br></br>
                                        <p className='sub-title'>{t('text-box-06')}</p>
                                        <div>
                                            <TextBoxCustom
                                                ref={cityRef}
                                                placeholderText={t('Place-holder-06')} />
                                            <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                                Please provide city</span>
                                        </div>
                                    </div>
                                    <div className='half-width'>
                                        <br></br>
                                        <p className='sub-title'>{t('text-box-07')}</p>
                                        <div>
                                            <TextBoxCustom
                                                ref={apartmentNoRef}
                                                placeholderText={t('Place-holder-07')} />
                                            <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                                Please provide apartment number</span>
                                        </div>
                                        <br></br>
                                        <p className='sub-title'>{t('text-box-08')}</p>
                                        <div>
                                            <TextBoxCustom
                                                ref={zipRef}
                                                placeholderText={t('Place-holder-08')} />
                                            <span style={{ 'color': 'red', 'font-size': '12px' }}>
                                                Please provide zip code</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='sub-main-layout-02'>
                        <div className='box-it'>
                            <p>{t('sub-head-03')}</p>
                            <br></br>
                            <TextAreaCustom />
                            <p className='sub-title margin-2'>{t('p-text')}</p>
                            <Button onClick={() =>
                            { submitForm(); }}>{t('button-text')}</Button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default React.memo(NewOrder);
