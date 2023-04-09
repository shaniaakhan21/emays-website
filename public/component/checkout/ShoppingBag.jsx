import ShoppingItem from './ShoppingItem';
import ButtonCustom from '../common/ButtonCustom';
import ListBoxCustom from '../common/ListBoxCustom';
import PropTypes from 'prop-types';

import '../../scss/component/checkout/shoppingBag.scss';

import FallBack from '../../icons/fallback.png';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

const getPriceList = (productList = []) => {
    return productList?.map((item) => (item.productCost));
};

const getFinalCost = (serviceCharge = 0.00, itemsPrices = []) => {
    const itemsTotal = itemsPrices?.reduce((acc, next) => { return +acc + +next; }, 0.00);
    return +serviceCharge + +itemsTotal;
};

const ShoppingBag = ({ productList = [], onDelete, serviceFee }) => {

    const [t] = useTranslation();

    const [finalCost, setFinalCost] = useState(0.00);

    useEffect(() => {
        const priceList = getPriceList(productList);
        const finalCost = getFinalCost(serviceFee, priceList);
        setFinalCost(finalCost);

    }, [productList]);

    const instruction = useMemo(() => [
        t('shopping-bag-container.instruction-1'),
        t('shopping-bag-container.instruction-2'),
        t('shopping-bag-container.instruction-3'),
    ], [t]);

    return (
        <div className='shopping-bag-container'>
            <div className='header'>
                <p>{t('shopping-bag-container.header')}</p>
            </div>
            <div className='items'>
                {
                    productList.map((item, idx) => <ShoppingItem
                        index={idx}
                        onDelete={onDelete}
                        itemName={item.productName}
                        image={item.productImage || FallBack}
                        color={item.productColor}
                        size={item.productSize}
                        quantity={item.productQuantity}
                        price={`€ ${item.productCost}`} />)
                }
            </div>
            <div className='service-fee'>
                <div className='text'><p>{t('shopping-bag-container.service-fee')}</p></div>
                <div className='cost'> { serviceFee ? <p>{`€ ${serviceFee}`}</p> : <p>Calculating...</p> }</div>
            </div>
            <div className='instruction'>
                <ListBoxCustom style={{ fontSize: '15px', fontFamily: 'Montserrat' }} items={instruction}/>
            </div>
            <div className='book'>
                <ButtonCustom
                    text={`${t('shopping-bag-container.button')}: € ${finalCost}`}
                    action={() => {}}
                    type={'secondary'}
                    customStyle={
                        // eslint-disable-next-line max-len
                        { minWidth: '100%', marginTop: '25px', marginBottom: '15px', justifyContent: 'center', paddingLeft: '63px' }} />
            </div>
        </div>
    );
};

ShoppingBag.propTypes = {
    productList: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            productName: PropTypes.string.isRequired,
            productImage: PropTypes.string,
            productColor: PropTypes.string.isRequired,
            productSize: PropTypes.string.isRequired,
            productQuantity: PropTypes.number.isRequired,
            productCost: PropTypes.number.isRequired
        })
    ).isRequired,
    onDelete: PropTypes.func
};
  
export default ShoppingBag;
