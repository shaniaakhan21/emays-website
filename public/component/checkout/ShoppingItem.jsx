import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { TrashCan } from '@carbon/icons-react';

import '../../scss/component/checkout/shoppingItem.scss';
import { useEffect, useState } from 'react';
import { getRetailerData } from '../../js/util/SessionStorageUtil';

const ShoppingItem = ({
    index,
    onDelete,
    itemName,
    color,
    quantity,
    price,
    size,
    image,
    imageAlt = 'product picture',
    currencySign
}) => {

    const [t] = useTranslation();
    const [processedAmount, setProcessedAmount] = useState('');
    const [processedFinalAmount, setProcessedFinalAmount] = useState('');

    useEffect(() => {
        const currency = getRetailerData()?.currency;
        let amountWithComma = '';
        let finalItemCost = '';
        // Here check the currency type and apply the currency display formatting
        if (currency === 'euro') {
            if (price && price.toString().includes('.')) {
                amountWithComma = `${price.split('.')[0]},${price.split('.')[1]}`;
            } else {
                amountWithComma = `${price},00`;
            }
            setProcessedAmount(amountWithComma);

            finalItemCost = quantity * +price;
            finalItemCost = finalItemCost.toFixed(2);
            if (finalItemCost && finalItemCost.toString().includes('.')) {
                finalItemCost = `${finalItemCost.split('.')[0]},${finalItemCost.split('.')[1]}`;
            } else {
                finalItemCost = `${finalItemCost},00`;
            }
            setProcessedFinalAmount(finalItemCost);
        }
    });

    return (
        <>
            <div className='container'>
                <div>
                    {/* TODO: Here display a fallback image if image is not available */}
                    {image ? (<img src={image} alt={imageAlt} />) : <></>}
                </div>
                <div className='details'>
                    <div className='header'>
                        <p>{itemName?.toUpperCase()}</p>
                        {onDelete && <TrashCan onClick={() => onDelete(index)} alt='Remove Item' />}
                    </div>
                    <div className='size'>
                        {
                            size && <p>{`${t('shopping-bag-container.item.size')}: ${size}`}</p>
                        }
                    </div>
                    <div className='color'>
                        {
                            color && <p>{`${t('shopping-bag-container.item.color')}: ${color}`}</p>
                        }
                    </div>
                    <div className='unit-price'>
                        {
                            // eslint-disable-next-line max-len
                            price && <p>{`${t('shopping-bag-container.item.unit-price')}: ${currencySign} ${processedAmount}`}</p>
                        }
                    </div>
                    <div className='quantity'>
                        {
                            quantity && price &&
                            <div>
                                <p>{`${t('shopping-bag-container.item.quantity')}: ${quantity}`}</p>
                            </div>
                        }
                        {
                            quantity && price &&
                            <div className='price'>
                                <p><strong>{currencySign} {processedFinalAmount}</strong></p>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    );

};

ShoppingItem.propTypes = {
    index: PropTypes.number.isRequired,
    itemName: PropTypes.string.isRequired,
    color: PropTypes.string,
    quantity: PropTypes.number.isRequired,
    price: PropTypes.string,
    size: PropTypes.string,
    image: PropTypes.string,
    imageAlt: PropTypes.string,
    onDelete: PropTypes.func
};

export default ShoppingItem;
