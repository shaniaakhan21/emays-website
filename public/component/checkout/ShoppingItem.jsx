import ErrorBoundary from '../ErrorBoundary';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import '../../scss/component/checkout/shoppingItem.scss';
import Trash from '../../images/trash.svg';

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

    return (
        <ErrorBoundary>
            <div className='container'>
                <div>
                    {/* TODO: Here display a fallback image if image is not available */}
                    {image ? (<img src={image} alt={imageAlt} />) : <></>}
                </div>
                <div className='details'>
                    <div className='header'>
                        <p>{itemName?.toUpperCase()}</p>
                        {onDelete && <img onClick={() => onDelete(index)} src={Trash} alt='Remove Item' />}
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
                                <p><strong>{price}</strong></p>
                            </div>
                        }   
                    </div>
                </div>
            </div>
        </ErrorBoundary>
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
