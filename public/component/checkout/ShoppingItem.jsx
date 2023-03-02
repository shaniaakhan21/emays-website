import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    padding-bottom: 8px;
    img {
        width: 77px;
        height: 103px;
    }
    .details {
        padding-left: 10px;
        width: 100%;
        .header {
            padding-top: 0px;
            p {
                font-size: 14px;
                font-weight: bold;
            }
        }

        .color, .size, .quantity {
            justify-content: space-between;
            p {
                font-size: 15px;
                font-family: 'SkolaSans';
                padding-top: 5px;
            }
        }

        .quantity {
            display: flex;
            flex-direction: row;
            
            .price {
                padding-left: 220px;
            }
        }
    }
`;

const ShoppingItem = ({
    itemName,
    color,
    quantity,
    price,
    size,
    image,
    imageAlt = 'product picture'
}) => {

    return (
        <Container>
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
        </Container>
    );

};

export default ShoppingItem;
