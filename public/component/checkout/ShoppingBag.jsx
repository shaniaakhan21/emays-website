import ShoppingItem from './ShoppingItem';
import ButtonCustom from '../common/ButtonCustom';
import ListBoxCustom from '../common/ListBoxCustom';

import '../../scss/component/checkout/shoppingBag.scss';

const instruction = ['This fee help us run our operations, all services included.',
    'Amount will be blocked on your card until the day of the delivery.',
    'Cancellations available before 24h appointment.'];

const serviceFee = '€ 1499.00';

const ShoppingBag = ({ productList }) => {
    return (
        <div className='shopping-bag-container'>
            <div className='header'>
                <p>SHOPPING BAG</p>
            </div>
            <div className='items'>
                {
                    productList.map((item) => <ShoppingItem
                        itemName={item.name}
                        image={item.image}
                        color={item.color}
                        size={item.size}
                        quantity={item.quantity}
                        price={item.price} />)
                }
            </div>
            <div className='service-fee'>
                <div className='text'><p>SERVICE FEE</p></div>
                <div className='cost'><p>{serviceFee}</p></div>
            </div>
            <div className='instruction'>
                <ListBoxCustom style={{ fontSize: '15px', fontFamily: 'SkolaSans' }} items = {instruction}/>
            </div>
            <div className='book'>
                <ButtonCustom text={'BOOK US NOW: € 1,499.00'} action={() => {}} type={'secondary'} 
                    customStyle={
                        { minWidth: '100%', marginTop: '25px', marginBottom: '15px', justifyContent: 'center' }} />
            </div>
        </div>
    );
};

export default ShoppingBag;
