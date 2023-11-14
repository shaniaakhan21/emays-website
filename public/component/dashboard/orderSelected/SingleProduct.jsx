import React, { useState, useRef } from 'react';
import FallBack from '../../../icons/fallback.png';
import '../../../scss/component/dashboard/singleProduct.scss';
import Checkbox from '@carbon/react/lib/components/Checkbox/Checkbox';

export const SingleProduct = ({ itemIndex, text, image,
    colorText, quantityText, size, cost, manageItems }) => {

    const checkBoxRef = useRef(null);

    const handleChange = (event) => {
        const index = checkBoxRef.current.getAttribute('data-index');
        const isChecked = checkBoxRef.current.getAttribute('data-index');
        manageItems(index, isChecked);
    };
      
    return (
        <div className='single-product'>
            <div className='wrap-two'>
                <div className='style-img'>
                    <img src={image || FallBack}></img>
                </div>
                <div className='text-style'>
                    <div>
                        <h5>{text}</h5>
                    </div>
                    <div>
                        <p>Size: {size}</p>
                    </div>
                    <div>
                        <p>Color: {colorText}</p>
                    </div>
                    <div>
                        <p>Quantity: {quantityText}</p>
                    </div>
                    <div>
                        <p>Cost: {cost}</p>
                    </div>
                </div>
            </div>
            <div className='checkbox'>
                <Checkbox
                    id={`myCheckbox${itemIndex}`}
                    onChange={handleChange}
                    disabled={false}
                    data-index={itemIndex}
                    ref={checkBoxRef}
                />
            </div>
        </div>
    );
};
