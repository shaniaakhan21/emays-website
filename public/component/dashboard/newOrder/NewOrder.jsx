import React, { useCallback, useState } from 'react';
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
    const [formData, setFormData] = useState({});

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
                                    <DatePickerCustom />
                                </div>
                            </div>
                            <div className='date'>
                                <div>
                                    <p>{t('delivery-time')}</p>
                                    <DropDownCustom
                                        items={
                                            timeframes?.map((tf, k) => ({ id: k, text: `${tf.start} to ${tf.end}` 
                                            }))}
                                    />
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
                                                placeholderText={t('Place-holder-01')} />
                                        </div>
                                        <br></br>
                                        <p className='sub-title'>{t('text-box-02')}</p>
                                        <div>
                                            <TextBoxCustom
                                                placeholderText={t('Place-holder-02')} />
                                        </div>
                                    </div>
                                    <div className='half-width'>
                                        <br></br>
                                        <p className='sub-title'>{t('text-box-03')}</p>
                                        <div>
                                            <TextBoxCustom
                                                placeholderText={t('Place-holder-03')} />
                                        </div>
                                        <br></br>
                                        <p className='sub-title'>{t('text-box-04')}</p>
                                        <div>
                                            <TextBoxCustom
                                                placeholderText={t('Place-holder-04')} />
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
                                                placeholderText={t('Place-holder-05')} />
                                        </div>
                                        <br></br>
                                        <p className='sub-title'>{t('text-box-06')}</p>
                                        <div>
                                            <TextBoxCustom
                                                placeholderText={t('Place-holder-06')} />
                                        </div>
                                    </div>
                                    <div className='half-width'>
                                        <br></br>
                                        <p className='sub-title'>{t('text-box-07')}</p>
                                        <div>
                                            <TextBoxCustom
                                                placeholderText={t('Place-holder-07')} />
                                        </div>
                                        <br></br>
                                        <p className='sub-title'>{t('text-box-08')}</p>
                                        <div>
                                            <TextBoxCustom
                                                placeholderText={t('Place-holder-08')} />
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
                            { history.push('/dashboard/deliveryOrders'); }}>{t('button-text')}</Button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default React.memo(NewOrder);
