
/* eslint-disable max-len */
import EmaysLogo from '../../../../images/Dashboard/EMAYSLOGO.svg';
import '../../../../scss/component/driver/payment.scss';
import TextBoxCustom from '../../../common/TextBoxCustom';
import DropDownCustom from '../../../common/DropdownCustom';
import { Button } from '@carbon/react';
import { useEffect } from 'react';
import { getReaderExe, collectPaymentExe, cardPresentExe, serverWebhookExe, resetPayment } from '../../redux/thunk/stripeThunk';
import { useDispatch, useSelector } from 'react-redux';
import { setTerminal } from '../../redux/slice/stripeSlice';
import { useNavigate } from 'react-router-dom';
import { driverSelectedOrderSelectorMemoized } from '../../redux/selector/driverSelectedOrderSelector';
import { getCurrencySign } from '../../../../js/util/currencyUtil';
import Decimal from 'decimal.js';
export const Payment = () => {
    const dispatch = useDispatch();
    const history = useNavigate();
    // TODO: Lets have separate selectors and remove this....
    const { reader, myPaymentIntent, cardFlag, myError, total, count, paymentStatus } = useSelector((state) => ( { reader: state.stripePaymentState.reader,
        myTerminalForPayment: state.stripePaymentState.terminalForPayment,
        myPaymentIntent: state.stripePaymentState.terminalPaymentIntent,
        cardFlag: state.stripePaymentState.cardFlag,
        myPaymentStaus: state.stripePaymentState.paymentStatus,
        // Do not set errors to the state. Handle where the error occurs
        myError: state.stripePaymentState.error,
        total: state?.driverFinalSelectionState?.finalSelection || [],
        count: state?.driverFinalSelectionState?.finalSelection?.length || 0,
        paymentStatus: state?.stripePaymentState?.paymentStatus ? state?.stripePaymentState?.paymentStatus.status : null
    } ) );

    const selectedOrderSelector = useSelector(driverSelectedOrderSelectorMemoized);
    const currencySign = getCurrencySign(selectedOrderSelector?.orderInfo?.basicInfo?.currencyType);

    useEffect(() => {
        
        const intervalId = setInterval(() => { 
            if (cardFlag)
            {
                dispatch(serverWebhookExe({ intervalId })); 
            }
            
        }, 5000);

        if (paymentStatus === 'Payment Successful')
        {
            (async () => {
                await dispatch(resetPayment());
                history('/dashboard/driver/history');
            })();
        }
    
        return () => {
            // Clear the interval when the component unmounts
            clearInterval(intervalId);
        };
    }, [myPaymentIntent, myError, paymentStatus]);

    const calculatePrice = (selectedProducts) => {
        if (selectedProducts.length > 0) {
            return selectedProducts.reduce((acc, next) => {
                const { productCost, quantity } = next;
                const productCostDecimal = new Decimal(productCost);
                const productQuantityDecimal = new Decimal(quantity);
                const accumulatorDecimal = new Decimal(acc);
                const total = productCostDecimal.times(productQuantityDecimal).plus(accumulatorDecimal);
                return total.toString(total); 
            }, 0.00);
        }
        return 0;
    };

    useEffect(() => {
        dispatch(getReaderExe());
    }, []);

    return (
        <>
            <div className='payment-section'>

                <div className='payment-header'>
                    <img src={EmaysLogo}/>
                </div>
                <br/>
                <br/>
                <div className='pay-arrange'>
                    <div className='w-here'>
                        <p className='sub-title'>Final Payment</p>
                        <br></br>
                        <div>
                            <TextBoxCustom
                                placeholderText={`${currencySign} ${ calculatePrice(total) }`} className='font-cst'/>
                        </div>
                        <div className='columns top-b'>
                            <div><p>{count}</p></div>
                            <div><p>Items</p></div>
                        </div>
                        <div>
                            <div>
                                <TextBoxCustom
                                    placeholderText='' />
                            </div>
                            <div className='columns grey-it'>
                                <div><p>Tax</p></div>
                                <div><p>{currencySign} 00.00</p></div>
                            </div>
                        </div>
                        <br></br>
                        <div className='columns border-b'>
                            <div><p>Subtotal</p></div>
                            <div><p>{`${currencySign} ${calculatePrice(total)}`}</p></div>
                        </div>
                        <div className='columns top-b'>
                            <div><p>Total due</p></div>
                            <div><p>{`${currencySign} ${calculatePrice(total)}`}</p></div>
                        </div>
                    </div>
                    <div className='w-here equi-dist'>
                        <div className='drops'>
                            <br></br>
                            <p className='sub-title'>Choose a payment method</p>
                            <br></br>
                            <DropDownCustom 
                                items={[
                                    { text: 'Card', value: 'card' },
                                    { text: 'Cash', value: 'cash' }
                                ]}
                            />
                        </div>
                        <div className='drops'>
                            <br></br>
                            <p className='sub-title'>Choose Terminal Reader</p>
                            <br></br>
                            <DropDownCustom 
                                items= {reader}
                                onChange = {(e) => { 
                                    dispatch(setTerminal(e.selectedItem.value)); 
                                }}
                            />
                        </div>
                        <div className='green'>
                            <Button onClick={() => { 
                                dispatch(collectPaymentExe(
                                    { finalAmountToPay: calculatePrice(total),
                                        currencyType: selectedOrderSelector?.orderInfo?.basicInfo?.currencyType }
                                ));
                            }}>Collect Payment</Button>
                        </div>
                        {/* <div>
                            <button disabled={cardFlag ? false : true} onClick={() => { dispatch(cardPresentExe()); }}>Present Card</button>

                        </div> */}
                    </div>
                </div>
            </div>
        </>
    );
};
