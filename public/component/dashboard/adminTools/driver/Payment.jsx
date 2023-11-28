
/* eslint-disable max-len */
import EmaysLogo from '../../../../images/Dashboard/EMAYSLOGO.svg';
import '../../../../scss/component/driver/payment.scss';
import TextBoxCustom from '../../../common/TextBoxCustom';
import DropDownCustom from '../../../common/DropdownCustom';
import { Button } from '@carbon/react';
import { useEffect } from 'react';
import { getReaderExe, collectPaymentExe, cardPresentExe, serverWebhookExe } from '../../redux/thunk/stripeThunk';
import { useDispatch, useSelector } from 'react-redux';
import { setTerminal } from '../../redux/slice/stripeSlice';
export const Payment = () => {
    const dispatch = useDispatch();
    const { reader, myPaymentIntent, cardFlag, myError } = useSelector((state) => ( { reader: state.stripePaymentState.reader,
        myTerminalForPayment: state.stripePaymentState.terminalForPayment,
        myPaymentIntent: state.stripePaymentState.terminalPaymentIntent,
        cardFlag: state.stripePaymentState.cardFlag,
        myPaymentStaus: state.stripePaymentState.paymentStatus,
        myError: state.stripePaymentState.error
    } ) );

    useEffect(() => {
        
        const intervalId = setInterval(() => { 
            if (cardFlag)
            {
                dispatch(serverWebhookExe({ intervalId })); 
            }
            
        }, 5000);
    
        return () => {
            // Clear the interval when the component unmounts
            clearInterval(intervalId);
        };
    }, [myPaymentIntent, myError]);

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
                                placeholderText='€ 50.00' className='font-cst'/>
                        </div>
                        <div className='columns top-b'>
                            <div><p>10</p></div>
                            <div><p>Items</p></div>
                        </div>
                        <div>
                            <div>
                                <TextBoxCustom
                                    placeholderText='' />
                            </div>
                            <div className='columns grey-it'>
                                <div><p>Tax</p></div>
                                <div><p>€ 00.00</p></div>
                            </div>
                        </div>
                        <br></br>
                        <div className='columns border-b'>
                            <div><p>Subtotal</p></div>
                            <div><p>€ 50.00</p></div>
                        </div>
                        <div className='columns top-b'>
                            <div><p>Total due</p></div>
                            <div><p>€ 50.00</p></div>
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
                            <Button onClick={() => { dispatch(collectPaymentExe()); }}>Collect Payment</Button>
                        </div>
                        <div>
                            <button disabled={cardFlag ? false : true} onClick={() => { dispatch(cardPresentExe()); }}>Present Card</button>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
