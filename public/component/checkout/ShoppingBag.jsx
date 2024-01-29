/* eslint-disable max-len */
import ShoppingItem from './ShoppingItem';
import PropTypes from 'prop-types';
import { CropGrowth, DotMark, LocationHeart, Purchase, WatsonHealthHangingProtocol,
    Information } from '@carbon/icons-react';

import '../../scss/component/checkout/shoppingBag.scss';

import FallBack from '../../icons/fallback.png';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getCurrencySign } from '../../js/util/currencyUtil';
import { getRetailerData } from '../../js/util/SessionStorageUtil';
import { Tooltip } from '@carbon/react';

const getPriceList = (productList = []) => {
    return productList?.map((item) => ({ cost: item.productCost, amount: item.productQuantity }));
};

const getFinalCost = (serviceCharge = 0.00, itemsPrices = []) => {
    const itemsTotal = itemsPrices?.reduce((acc, next) => { return +acc + (+next.cost * +next.amount); }, 0.00);
    return +serviceCharge + +itemsTotal;
};

const ShoppingBag = ({ productList = [], onDelete, serviceFee, currencyType }) => {

    const [t] = useTranslation();

    const [finalCost, setFinalCost] = useState('');
    const [processedServiceCost, setProcessedServiceCost] = useState(null);

    useEffect(() => {
        const priceList = getPriceList(productList);
        for (let i = 0; i <= priceList?.length; i++) {
            const itemPrice = priceList[i]?.cost;
            if (itemPrice && itemPrice?.includes(',')) {
                const [wholeNumber, decimal] = itemPrice?.split(',');
                const formattedAmount = `${wholeNumber}.${(decimal)}`;
                priceList[i].cost = +formattedAmount;
            }
        }
        const finalCost = getFinalCost(0, priceList);
        let processedFinalCost = '';
        let processedServiceCost = '';
        if (currencyType === 'euro' && finalCost) {
            if (finalCost && finalCost.toString().includes('.')) {
                const [wholeNumber, decimal] = (+finalCost).toFixed(2).toString().split('.');
                processedFinalCost = `${wholeNumber},${(decimal)}`;
            } else if (finalCost && finalCost.toString().includes(',')) {
                const [wholeNumber, decimal] = (+finalCost).toFixed(2).toString().split(',');
                processedFinalCost = `${wholeNumber},${(decimal)}`;
            } else {
                processedFinalCost = `${finalCost},00`;
            }
        }
        processedFinalCost = processedFinalCost;
        setFinalCost(processedFinalCost);

        if (currencyType === 'euro' && serviceFee) {
            if (serviceFee && serviceFee.toString().includes('.')) {
                processedServiceCost = `${serviceFee.toString().split('.')[0]},${serviceFee.toString().split('.')[1]}`;
            } else {
                processedServiceCost = `${serviceFee},00`;
            }
        }
        setProcessedServiceCost(processedServiceCost);
    }, [productList, serviceFee]);

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
                        price={`${item.productCost}`}
                        currencySign={getCurrencySign(getRetailerData()?.currency || '')} />)
                }
            </div>
            <div className='total-fee'>
                <div className='text'><p>{t('shopping-bag-container.tot-try-on')}</p>
                    <Tooltip align={'bottom'} label={t('shopping-bag-container.tot-try-on-message')}>
                        <Information className='sb-tooltip-trigger'/>
                    </Tooltip>
                </div>
                <div className='cost'> { finalCost ? 
                    <p>{`${getCurrencySign(currencyType)} ${finalCost}`}</p> : <p>Pending...</p> }</div>
            </div>
            <div className='service-fee'>
                <div className='text'><p>{t('shopping-bag-container.delivery-fee')}</p></div>
                <div className='cost'> { processedServiceCost ? 
                    <p>{`${getCurrencySign(currencyType)} ${processedServiceCost}`}</p> : <p>Pending...</p> }</div>
            </div>
            <div className='today-fee'>
                <div className='text'><p>{t('shopping-bag-container.today-fee')}</p></div>
                <div className='cost'> { processedServiceCost ? 
                    <p>{`${getCurrencySign(currencyType)} ${processedServiceCost}`}</p> : <p>Pending...</p> }</div>
            </div>
            <div className='info-payment'>
                <p><DotMark /> {t('shopping-bag-container.explain.des-one')}</p>
                <p><DotMark /> {t('shopping-bag-container.explain.des-two')}</p>
                <p><DotMark /> {t('shopping-bag-container.explain.des-three')}</p>

                {/* <ListBoxCustom style={{ fontSize: '15px', fontFamily: 'Montserrat' }} items={instruction}/> */}
            </div>
            <div className='about-shopping'>
                <div className='text'><p>{t('shopping-bag-container.seamless.des')}</p></div>
            </div>
            <div className='info-shopping'>
                <div className='inner'>
                    <div><LocationHeart /></div>
                    <div><p>{t('shopping-bag-container.seamless.one')}</p></div>
                </div>
                <div className='inner'>
                    <div><Purchase /></div>
                    <div><p>{t('shopping-bag-container.seamless.two')}</p></div>
                </div>
                <div className='inner'>
                    <div><WatsonHealthHangingProtocol /></div>
                    <div><p>{t('shopping-bag-container.seamless.three')}</p></div>
                </div>
                <div className='inner'>
                    <div><CropGrowth /></div>
                    <div><p>{t('shopping-bag-container.seamless.four')}</p></div>
                </div>
            </div>
            {/* <div className='book'>
                <ButtonCustom
                    text={`${t('shopping-bag-container.button')}: ${getCurrencySign(currencyType)} ${finalCost}`}
                    action={() => {}}
                    type={'secondary'}
                    customStyle={
                        // eslint-disable-next-line max-len
                        { minWidth: '100%', marginTop: '25px', marginBottom: '15px', justifyContent: 'center', paddingLeft: '63px' }} />
            </div> */}
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
