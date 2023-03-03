import ShoppingItem from './ShoppingItem';
import ButtonCustom from '../common/ButtonCustom';
import ListBoxCustom from '../common/ListBoxCustom';

import '../../scss/component/checkout/shoppingBag.scss';

import FallBack from '../../icons/fallback.png';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

const serviceFee = 1499.00;

const getPriceList = (productList = []) => {
    const priceList = productList?.map((item) => (item.productCost));
    return priceList;
};

const getFinalCost = (serviceCharge = 0.00, itemsPrices = []) => {
    const itemsTotal = itemsPrices?.reduce((acc, next) => { return +acc + +next; }, 0.00);
    return +serviceCharge + +itemsPrices;
};

const ShoppingBag = ({ productList = [] }) => {

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
        t('shopping-bag-container.instruction-3')
    ], [t]);

    return (
        <div className='shopping-bag-container'>
            <div className='header'>
                <p>{t('shopping-bag-container.header')}</p>
            </div>
            <div className='items'>
                {
                    productList.map((item) => <ShoppingItem
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
                <div className='cost'><p>{`€ ${serviceFee}`}</p></div>
            </div>
            <div className='instruction'>
                <ListBoxCustom style={{ fontSize: '15px', fontFamily: 'SkolaSans' }} items={instruction}/>
            </div>
            <div className='book'>
                <ButtonCustom
                    text={`${t('shopping-bag-container.button')}: € ${finalCost}`}
                    action={() => {}}
                    type={'secondary'}
                    customStyle={
                        { minWidth: '100%', marginTop: '25px', marginBottom: '15px', justifyContent: 'center' }} />
            </div>
        </div>
    );
};

export default ShoppingBag;
