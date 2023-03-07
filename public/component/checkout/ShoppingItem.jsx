import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import '../../scss/component/checkout/shoppingItem.scss';

const ShoppingItem = ({

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
        <div className='container'>
            <div>
                {/* TODO: Here display a fallback image if image is not available */}
                {image ? (<img src={image} alt={imageAlt} />) : <></>}
            </div>
            <div className='details'>
                <div className='header'>
                    <p>{itemName?.toUpperCase()}</p>
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
    );

};

ShoppingItem.propTypes = {
    itemName: PropTypes.string.isRequired,
    color: PropTypes.string,
    quantity: PropTypes.number.isRequired,
    price: PropTypes.string.isRequired,
    size: PropTypes.string,
    image: PropTypes.string,
    imageAlt: PropTypes.string
};

export default ShoppingItem;
