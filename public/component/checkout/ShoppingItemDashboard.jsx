import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { TrashCan } from '@carbon/icons-react';

import '../../scss/component/checkout/shoppingItemDashboard.scss';
import { appInfoSelectorMemoized } from '../dashboard/redux/selector/appInfoSelector';
import { useSelector } from 'react-redux';
import { getCurrencySign } from '../../js/util/currencyUtil';
import { selectedOrderSelectorMemoized } from '../dashboard/redux/selector/selectedOrderSelector';

const ShoppingItem = ({
    index,
    onDelete,
    itemName,
    color,
    quantity,
    price,
    size,
    image,
    imageAlt = 'product picture'
}) => {

    const [t] = useTranslation();
    const appInfoSelector = useSelector(appInfoSelectorMemoized);
    const selectedOrderSelector = useSelector(selectedOrderSelectorMemoized);
    const currencySign = getCurrencySign(appInfoSelector?.systemInfoState?.data?.fiscalInfo?.currencyType || 
        // When driver login should use this
        selectedOrderSelector?.data?.basicInfo?.currencyType);

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
                            size && <p>{`Size: ${size}`}</p>
                        }
                    </div>
                    <div className='color'>
                        {
                            color && <p>{`Color: ${color}`}</p>
                        }
                    </div>
                    <div className='quantity'>
                        {
                            quantity &&
                            <div>
                                <p>{`Quantity: ${quantity}`}</p>
                            </div>
                        }
                    </div>
                    <div className='price'>
                        {
                            price &&
                            <div className='price'>
                                <p>Price: {currencySign} {price}</p>
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
