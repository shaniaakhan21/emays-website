import '../../../../scss/component/dashboard/driverHistory.scss';
import Checkbox from '@carbon/react/lib/components/Checkbox/Checkbox';
import React, { useState } from 'react';

export const SingleProduct = ({ text, image, colorText, quantityText }) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleChange = (event) => {
        console.log('Checkbox changed:', event.target.checked);
        setIsChecked(event.target.checked);
        console.log('isChecked state:', isChecked);
    };
      
    return (
        <div className='ItemContainer'>
            <div className='wrap-two'>
                <div className='styl-img'>
                    <img src={image}></img>
                </div>
                <div className='text-styl'>
                    <div>
                        <h5>{text}</h5>
                        <h6>{colorText}</h6>
                    </div>
                    <div className='quantity'>
                        <h6>{quantityText}</h6>
                    </div>
                </div>
            </div>
            <div style={{ 'display': 'flex' }}>
                <Checkbox
                    id='myCheckbox'
                    checked={isChecked}
                    onChange={handleChange}
                    disabled={false}
                />
            </div>
        </div>
    );
};
