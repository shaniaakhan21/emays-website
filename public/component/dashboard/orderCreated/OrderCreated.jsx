import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Heading } from '@carbon/react';
import { useDispatch, useSelector } from 'react-redux';
import { newOrderPhaseOneSelectorMemoized } from '../redux/selector/newOrderSelector';
import { newOrderPhaseTwoSelectorMemoized } from '../redux/selector/newOrderSelector';
import OrderReviewVertical from '../orderReview/OrderReviewVertical';

// SCSS
import '../../../scss/component/retailer/orderCreated.scss';
import ButtonCustom from '../../common/ButtonCustom';
import { useNavigate } from 'react-router-dom';

const OrderCreated = () => {
    const [translate] = useTranslation();
    const history = useNavigate();
    const t = useCallback((key) => translate(`dashboard.orderCreated.${key}`), [translate]);

    const newOrderPhaseOneSelector = useSelector(newOrderPhaseOneSelectorMemoized);
    const newOrderPhaseTwoSelector = useSelector(newOrderPhaseTwoSelectorMemoized);

    return (
        <div className='orderCreated'>
            <div className='header'>
                <Heading className='title'>{t('title')}</Heading>
                {/* <Heading className='sub-title'>{t('sub-title')}</Heading> */}
            </div>
            {
                <OrderReviewVertical basicInfo = {newOrderPhaseOneSelector} itemsInfo = {newOrderPhaseTwoSelector}
                    infoTitle = {'Appointment'}
                    itemsTitle = {'Items to be delivered'}/>
            }
            <div className='changeDirection'>
                <ButtonCustom
                    text={'Continue to Overview'}
                    action={() => { history('/overview'); }}
                    type={'secondary'}
                    customStyle={{
                        minWidth: '24vw',
                        marginTop: '25px',
                        marginBottom: '15px',
                        alignContent: 'center',
                        justifyContent: 'center',
                        padding: '1%'
                    }}
                />
            </div>
        </div>
    );
};

export default React.memo(OrderCreated);
