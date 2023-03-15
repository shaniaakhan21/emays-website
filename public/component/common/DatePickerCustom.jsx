import React from 'react';
import { PropTypes } from 'prop-types';
import { DatePicker, DatePickerInput } from '@carbon/react';

const DatePickerCustom = ({ handleDateChange, customStyle, selectedDate }) => {
    return (
        <DatePicker
            value={selectedDate}
            maxDate='09/01/2050'
            datePickerType='single'
            onSelect={(event) => {
                handleDateChange(event);
            }}
        >
            <DatePickerInput
                style={customStyle} placeholder='mm/dd/yyyy' />
        </DatePicker>
    );
};

DatePickerCustom.propTypes = {
    ...DatePicker.propTypes,
    selectedDate: PropTypes.string,
    handleDateChange: PropTypes.func.isRequired
};

export default DatePickerCustom;
