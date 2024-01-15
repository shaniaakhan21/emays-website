import StatusBox from '../../common/statusBox';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Table from '../../common/table';
import { useTranslation } from 'react-i18next';
import { selectedOrderSelectorMemoized } from '../redux/selector/selectedOrderSelector';
import { useDispatch, useSelector } from 'react-redux';
import HistoryHeader from '../history/component/header';
import DOSelectedOrderHeader from '../deliveryOrder/component/selectedHeader';
import { getOrderDaDataById } from '../redux/thunk/inCompleteOrderThunk';
import ButtonCustom from '../../common/ButtonCustom';
import OrderReviewHorizontal from '../orderReview/OrderReviewHorizontal';
import { getOrderStatus } from '../../../js/util/stateBuilderUtil';
import { changeStatusSelectedOrder } from '../redux/thunk/selectedOrderThunk';
import { loginSelectorMemoized } from '../redux/selector/loginSelector';
import { useMessage } from '../../common/messageCtx';

// SCSS
import '../../../scss/component/dashboard/selectedItem.scss';
import moment from 'moment';
import { getCurrencySign } from '../../../js/util/currencyUtil';

const OrderSelected = ({ gridData, basicInfo, itemsInfo, infoTitle, itemsTitle }) => {

    const [translate] = useTranslation();
    const pushAlert = useMessage();
    const t = useCallback((str) => translate(`dashboard.overview.${str}`), [translate]);
    const [m] = useTranslation();
    const selectedOrderSelector = useSelector(selectedOrderSelectorMemoized);
    const loginStatusSelector = useSelector(loginSelectorMemoized);
    const [selectedRow, setSelectedRow] = useState({ basicInfo: null, itemsInfo: null });
    const [isSearchPerformed, setIsSearchPerformed] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (+(selectedOrderSelector?.data?.basicInfo?.serviceFee) === 0 &&
             loginStatusSelector?.role === 'external_system') {
            pushAlert({
                kind: 'warning',
                title: m('statusMessage.warning'),
                subtitle: m('statusMessage.message.service-fee-not-payed')
            });
        }
    }, [selectedOrderSelector?.isLoading]);

    const headers = useMemo(
        () => ['id', 'client', 'amount', 'date', 'time', 'status'].map(key => ({ key, header: t(`table.${key}`) })
        ), [t]);

    const [tableRow, setTableRow] = useState([{
        id: '',
        client: '',
        amount: '',
        date: '',
        time: '',
        orderItems: [],
        status: <StatusBox status={'Pending to pickup'}/>
    }]);

    const getReadyToPickUpButtonDisabledStatus = () => {
        if (selectedOrderSelector?.data?.basicInfo?.isPrepared) {
            return true;
        } else if (loginStatusSelector?.role === 'driver' ||
            loginStatusSelector?.role === 'client' || loginStatusSelector?.role === 'super') {
            return true;
        } else if (+(selectedOrderSelector?.data?.basicInfo?.serviceFee) === 0 ) {
            return true;
        }
        return false;
    };

    const getFinalCost = (itemsInfo) => {
        const itemsTotal = itemsInfo?.reduce((acc, next) => {
            return +acc + +next?.productCost; }, 0.00);
        return (+itemsTotal).toFixed(2);
    };

    const getSelectedOrderInfo = useCallback((id) => { 
        return dispatch(getOrderDaDataById({ orderId: id }));
    }, [dispatch]);

    const searchId = async (id) => {
        const itemSearched = await getSelectedOrderInfo(id);
        const cost = getFinalCost(itemSearched?.payload?.orderItems);
        const preparedObject = { ...itemSearched?.payload };
        const preparedItemsData = itemSearched?.payload?.orderItems?.map((item) => ({
            itemName: item?.productName,
            image: item?.productImage,
            color: item?.productColor,
            size: item?.productSize,
            quantity: item?.productQuantity,
            productCost: item?.productCost

        }));
        const itemsInfo = {
            items: preparedItemsData,
            total: cost
        };
        const finalData = {
            basicInfo: preparedObject,
            itemsInfo: itemsInfo,
            infoTitle: 'Appointment',
            itemTitle: 'Searched Items' };
        // Set selected row items
        setSelectedRow(finalData);
        // Set found row
        const prepRows = prepareTableRows(itemSearched?.payload);
        setTableRow([prepareTableRows(itemSearched?.payload)]);
        setIsSearchPerformed(true);
    };

    const prepareTableRows = (payload) => {
        // eslint-disable-next-line max-len
        const amount = payload?.orderItems?.reduce((acc, current) => acc + (current?.productQuantity * current?.productCost), 0) || '';
        
        let amountWithComma;
        if (amount && amount.toString().includes('.')) {
            amountWithComma = `${amount?.toString()?.split('.')[0]},${amount?.toString()?.split('.')[1]}`;
        } else {
            amountWithComma = `${amount},00`;
        }
        const date = new Date(payload?.createdAt);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const currencyType = getCurrencySign(data?.currencyType);
        return {
            id: payload?._id || '',
            client: `${payload?.firstName} ${payload?.lastName}` || '',
            amount: `${currencyType} ${amountWithComma}`,
            date: moment(payload?.date?.split('T')[0]).format('DD-MM-YYYY') || '',
            time: `${hours}:${minutes}` || '',
            orderItems: payload?.orderItems,
            status: <StatusBox status={getOrderStatus({ isDelivered: payload?.isDelivered,
                isDriverPicked: payload?.isDriverPicked,
                isDriverApproved: payload?.isDriverApproved,
                isPrepared: payload?.isPrepared })}/>
        };
    };

    const changeStatus = useCallback(() => {
        console.log();
        return dispatch(changeStatusSelectedOrder({ orderId: selectedOrderSelector?.data?.basicInfo?._id,
            patchData: {
                isPrepared: true 
            } }));
    });
    
    return (

        <div className={'selected-item-container'}>
            <div className={'item-row selected-item-header'}>
                <div>
                    {
                        selectedOrderSelector?.data?.headerType === 'History' && 
                        <HistoryHeader searchFunction={searchId}/>
                    }
                    {
                        selectedOrderSelector?.data?.headerType === 'DeliveryOrder' && 
                        <DOSelectedOrderHeader data = {selectedOrderSelector?.data?.selectedTableRow}/>
                    }
                    {/* <OrderSelectedHeader searchFunction={searchId} 
                        headerComponents={selectedOrderSelector?.data?.headerComponents}/> */}
                </div>
            </div>
            <div className={'item-row selected-item-table'}>
                <div>
                    <div>
                        { 
                            // Selected row
                            !isSearchPerformed && selectedOrderSelector?.data?.selectedTableRow && 
                            <Table rows={selectedOrderSelector?.data?.selectedTableRow} 
                                headers={headers} onRowClick={(item) => {}} />
                        }
                        {
                            // Search result
                            isSearchPerformed && tableRow &&
                            <Table rows={tableRow} headers={headers} onRowClick={(item) => {}} />
                        }
                    </div>
                </div>
                {
                    selectedOrderSelector?.data?.headerType === 'DeliveryOrder' && 
                <div className='button-order-prepared'>
                    <ButtonCustom
                        text={'Mark ready to pick up'}
                        disabled = {getReadyToPickUpButtonDisabledStatus()
                        }
                        action={async () => {
                            if (selectedOrderSelector?.data?.basicInfo?.paymentRef) {
                                const result = await changeStatus();
                                if (result?.payload?.patchedStatus) {
                                    pushAlert({
                                        kind: 'success',
                                        title: m('statusMessage.success'),
                                        subtitle: m('statusMessage.message.success-update')
                                    });
                                }
                            } else {
                                return;
                            }
                            
                        }}
                        customStyle={{
                            width: '500px',
                            marginTop: '33px',
                            marginBottom: '15px',
                            padding: '1%',
                            backgroundColor: `${selectedOrderSelector?.data?.basicInfo?.isPrepared ?
                                'rgb(196, 196, 196)' : '#24a148'}`,
                            color: 'white'
                        }}
                    />
                </div>
                }
            </div>
            <div className={'item-row selected-item-items'}>
                <div>
                    { 
                        // Selected row
                        !isSearchPerformed && selectedOrderSelector?.data && 
                        <OrderReviewHorizontal basicInfo = {selectedOrderSelector?.data?.basicInfo}
                            itemsInfo = {selectedOrderSelector?.data?.itemsInfo}
                            infoTitle = {selectedOrderSelector?.data?.infoTitle}
                            itemsTitle = {selectedOrderSelector?.data?.itemTitle}/>
                    }
                    {
                        // Search result
                        isSearchPerformed &&
                        <OrderReviewHorizontal basicInfo={selectedRow?.basicInfo}
                            itemsInfo={selectedRow?.itemsInfo}
                            infoTitle={'Appointment'}
                            itemsTitle={'Items'} />
                    }
                </div>
            </div>
        </div>
    );
};

export default OrderSelected;
