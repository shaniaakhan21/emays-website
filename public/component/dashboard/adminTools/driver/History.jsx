import '../../../../scss/component/dashboard/driverHistory.scss';
import { SingleProduct } from '../driver/SingleProduct';
import ItemImg from '../../../../images/Dashboard/watch.png';
export const DriverHistory = () => {
    const products = [
        {
            text: 'Gancini Watch',
            image: ItemImg,
            colorText: 'Color: IP yellow Gold',
            quantityText: 'Quantity: 10'
        },
        {
            text: 'Another Product',
            image: ItemImg,
            colorText: 'Color: Silver',
            quantityText: 'Quantity: 5'
        },
        {
            text: 'Gancini Watch',
            image: ItemImg,
            colorText: 'Color: IP yellow Gold',
            quantityText: 'Quantity: 10'
        },
        {
            text: 'Another Product',
            image: ItemImg,
            colorText: 'Color: Silver',
            quantityText: 'Quantity: 5'
        },
        {
            text: 'Gancini Watch',
            image: ItemImg,
            colorText: 'Color: IP yellow Gold',
            quantityText: 'Quantity: 10'
        },
        {
            text: 'Another Product',
            image: ItemImg,
            colorText: 'Color: Silver',
            quantityText: 'Quantity: 5'
        },
        {
            text: 'Gancini Watch',
            image: ItemImg,
            colorText: 'Color: IP yellow Gold',
            quantityText: 'Quantity: 10'
        },
        {
            text: 'Another Product',
            image: ItemImg,
            colorText: 'Color: Silver',
            quantityText: 'Quantity: 5'
        }

    ];
    return (
        <div className='driver-history-box'>
            <h5 className='head'>Add items client wants to keep</h5>
            <br />
            <div className='wrap-products'>
                {products.map((product, index) => (
                    <SingleProduct
                        key={index}
                        text={product.text}
                        image={product.image}
                        colorText={product.colorText}
                        quantityText={product.quantityText}
                    />
                ))}
            </div>
            <br/>
            <div className='styl-pay'>
                <div className='pay-h2'>
                    <h2>Total to be paid by client</h2>
                </div>

                <div className='pay-h2-amount'>
                    <h2>€ 76.802 </h2>
                </div>
            </div>
        </div>
    );
};
