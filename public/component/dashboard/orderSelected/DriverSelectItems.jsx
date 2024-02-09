import { useState, useReducer, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { driverSelectedOrderSelectorMemoized } from '../redux/selector/driverSelectedOrderSelector';
import { SingleProduct } from './SingleProduct';
import { driverSelectFinal } from '../redux/thunk/driverFinalSelectThunk';

// SCSS
import '../../../scss/component/dashboard/driverSelectItems.scss';
import ButtonCustom from '../../common/ButtonCustom';
import { useNavigate } from 'react-router-dom';
import { getCurrencySign } from '../../../js/util/currencyUtil';
import Decimal from 'decimal.js';

const DriverSelectItems = () => {

    const [selectedProducts, setSelectedProducts] = useState([]);
    const dispatch = useDispatch();
    const history = useNavigate();

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
    const currencySign = getCurrencySign(selectedOrderSelector?.orderInfo?.basicInfo?.currencyType);
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
                            cost={`${currencySign} ${product?.productCost}`}
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
                        <h2>{currencySign} {selectedProducts.reduce((acc, next) => {
                            const { productCost, quantity } = next;
                            const productCostDecimal = new Decimal(productCost);
                            const productQuantityDecimal = new Decimal(quantity);
                            const accumulatorDecimal = new Decimal(acc);
                            const total = productCostDecimal.times(productQuantityDecimal).plus(accumulatorDecimal);
                            return total.toString(total);    
                        }, 0.00)} </h2>
                    </div>
                </div>
                <div className='action-button'>
                    <ButtonCustom
                        text={'Go to payment >'}
                        action={() => {
                            history('/dashboard/driver/payment');
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
