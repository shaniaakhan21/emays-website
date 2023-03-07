import { Popover, PopoverContent } from '@carbon/react';
import PropTypes from 'prop-types';
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

PopoverCustom.propTypes = {
    children: PropTypes.node.isRequired,
    toggleText: PropTypes.string.isRequired,
    toggleTextStyle: PropTypes.object
};

export default PopoverCustom;
