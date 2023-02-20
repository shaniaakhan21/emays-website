import { Popover, PopoverContent } from '@carbon/react';
import React, { useState } from 'react';

const PopoverCustom = ({ children, toggleText, toggleTextStyle }) => {

    const [open, setOpen] = useState(false);
    const text = children;

    return (
        <Popover open={open}>
            <button
                type='button'
                style={toggleTextStyle}
                onClick={() => {
                    setOpen(!open);
                }}>
                {toggleText}
            </button>
            <PopoverContent>
                {text}
            </PopoverContent>
        </Popover>
    );

};

export default PopoverCustom;
