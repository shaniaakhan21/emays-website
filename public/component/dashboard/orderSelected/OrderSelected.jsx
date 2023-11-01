import OrderReview from '../orderReview/OrderReview';
import StatusBox from '../../common/statusBox';
import { useCallback, useEffect, useMemo, useState } from 'react';
import OrderSelectedHeader from './component/Header';
import Table from '../../common/table';
import { useTranslation } from 'react-i18next';
import { selectedOrderSelectorMemoized } from '../redux/selector/selectedOrderSelector';
import { useDispatch, useSelector } from 'react-redux';
import HistoryHeader from '../history/component/header';
import DOSelectedOrderHeader from '../deliveryOrder/component/selectedHeader';

// SCSS
import '../../../scss/component/dashboard/selectedItem.scss';
import { getOrderDaDataById } from '../redux/thunk/inCompleteOrderThunk';
import ButtonCustom from '../../common/ButtonCustom';
import OrderReviewHorizontal from '../orderReview/OrderReviewHorizontal';
import { patchOrderByOrderId } from '../../../services/dashboard/order';
import { getOrderStatus } from '../../../js/util/stateBuilderUtil';
import { changeStatusSelectedOrder } from '../redux/thunk/selectedOrderThunk';

const OrderSelected = ({ gridData, basicInfo, itemsInfo, infoTitle, itemsTitle }) => {

    const [translate] = useTranslation();
    const t = useCallback((str) => translate(`dashboard.overview.${str}`), [translate]);
    const selectedOrderSelector = useSelector(selectedOrderSelectorMemoized);
    const [selectedRow, setSelectedRow] = useState({ basicInfo: null, itemsInfo: null });
    const [isSearchPerformed, setIsSearchPerformed] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
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

    const getFinalCost = (itemsInfo, serviceCharge) => {
        const itemsTotal = itemsInfo?.reduce((acc, next) => {
            return +acc + +next?.productCost; }, 0.00);
        return (+serviceCharge + +itemsTotal).toFixed(2);
    };

    const searchId = async (id) => {
        const itemSearched = await dispatch(getOrderDaDataById({ orderId: id }));
        const cost = getFinalCost(itemSearched?.payload?.orderItems, itemSearched?.serviceFee);
        const preparedObject = { ...itemSearched?.payload };
        const preparedItemsData = itemSearched?.payload?.orderItems?.map((item) => ({
            itemName: item?.productName,
            image: item?.productImage,
            color: item?.productColor,
            size: item?.productSize,
            quantity: item?.productQuantity
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
        const date = new Date(payload?.createdAt);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        return {
            id: payload?._id || '',
            client: `${payload?.firstName} ${payload?.lastName}` || '',
            amount: `€ ${amount}`,
            date: payload?.date?.split('T')[0] || '',
            time: `${hours}:${minutes}` || '',
            orderItems: payload?.orderItems,
            status: <StatusBox status={getOrderStatus({ isDelivered: data?.isDelivered,
                isPrepared: data?.isPrepared })}/>
        };
    };
    
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
                        disabled = {selectedOrderSelector?.data?.basicInfo?.isPrepared ? true : false }
                        action={() => {
                            dispatch(changeStatusSelectedOrder({ orderId: selectedOrderSelector?.data?.basicInfo?._id,
                                patchData: {
                                    isPrepared: true 
                                } }));
                        }}
                        customStyle={{
                            width: '500px',
                            marginTop: '25px',
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
