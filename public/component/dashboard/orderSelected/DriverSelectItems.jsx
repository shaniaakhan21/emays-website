
// SCSS
import { useSelector } from 'react-redux';
import '../../../scss/component/dashboard/driverSelectItems.scss';
import { driverSelectedOrderSelectorMemoized } from '../redux/selector/driverSelectedOrderSelector';
import { SingleProduct } from './SingleProduct';
import { useState } from 'react';

const DriverSelectItems = () => {

    const [selectedProducts, setSelectedProducts] = useState([]);

    const selectItems = (index, isSelected) => {
        const item = { ...orderInfo[index] };
        item['index'] = index;
        if (isSelected) {
            setSelectedProducts((items) => {
                const isPresent = items.find((itemCurrent) => (itemCurrent.index === index)).length > 0 ? true : false;
                if (!isPresent) {
                    return [...items, item];
                }
            });
        } else {
            setSelectedProducts((items) => {
                const removedArray = items.map((itemCurrent) => (itemCurrent.index !== index));
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
                            console.log(next);
                            return +acc + +next?.productCost; }, 0.00)} </h2>
                    </div>
                </div>
            </div> : <p>Loading...</p>
    );

};

export default DriverSelectItems;
