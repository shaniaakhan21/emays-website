import { useState, useReducer, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { driverSelectedOrderSelectorMemoized } from '../redux/selector/driverSelectedOrderSelector';
import { SingleProduct } from './SingleProduct';
import { driverSelectFinal } from '../redux/thunk/driverFinalSelectThunk';

// SCSS
import '../../../scss/component/dashboard/driverSelectItems.scss';
import ButtonCustom from '../../common/ButtonCustom';

const DriverSelectItems = () => {

    const [selectedProducts, setSelectedProducts] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
    }, [driverSelectedOrderSelectorMemoized]);

    useEffect(() => {
        dispatch(driverSelectFinal(selectedProducts));
    }, [selectedProducts]);

    const selectItems = (index, isSelected) => {
        const item = { ...orderInfo[index] };
        item['index'] = index;
        if (isSelected) {
            setSelectedProducts((items) => {
                let isPresent = false;
                if (items) {
                    const found = selectedProducts?.find((itemCurrent) => (+itemCurrent.index === +index));
                    // eslint-disable-next-line no-nested-ternary
                    isPresent = found ? (found.length > 0) ? true : false : false;
                }
                if (!isPresent) {
                    return [...items, item];
                }
            });
        } else {
            setSelectedProducts((items) => {
                console.log('index', +index);
                const removedArray = items?.filter((itemCurrent) => (+itemCurrent.index !== +index));
                return removedArray;
            });
        }
    };

    const selectedOrderSelector = useSelector(driverSelectedOrderSelectorMemoized);
    const orderInfo = selectedOrderSelector?.orderInfo?.itemsInfo?.items;
    return (
        orderInfo ?
            <div className='driver-history-box'>
                <h4 className='head'>Add items client wants to keep</h4>
                <br />
                <div className='wrap-products'>
                    {orderInfo.map((product, index) => (
                        <SingleProduct
                            key={index}
                            itemIndex={index}
                            text={product?.itemName}
                            image={product?.image}
                            colorText={product?.color}
                            quantityText={product?.quantity}
                            size={product?.size}
                            cost={product?.productCost}
                            manageItems={selectItems}
                        />
                    ))}
                </div>
                <br/>
                <div className='style-pay'>
                    <div className='pay-h2'>
                        <h2>Total to be paid by client</h2>
                    </div>

                    <div className='pay-h2-amount'>
                        <h2>€ {selectedProducts.reduce((acc, next) => {
                            return +acc + ((+next?.productCost) * next?.quantity); }, 0.00)} </h2>
                    </div>
                </div>
                <div className='action-button'>
                    <ButtonCustom
                        text={'Go to payment >'}
                        action={() => {
                            dispatch(changeStatusSelectedOrder({ orderId: orderInfo?.basicInfo?._id,
                                patchData: {
                                    isDriverApproved: true 
                                } }));
                        }}
                        customStyle={{
                            width: '180px',
                            marginTop: '25px',
                            marginBottom: '15px',
                            padding: '1%',
                            color: 'white'
                        }}
                    />
                </div>
            </div> : <p>Loading...</p>
    );

};

export default DriverSelectItems;
