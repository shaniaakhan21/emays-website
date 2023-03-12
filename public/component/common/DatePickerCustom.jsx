import DatePicker from '@carbon/react/lib/components/DatePicker';
import DatePickerInput from '@carbon/react/lib/components/DatePickerInput';
import React from 'react';
import { PropTypes } from 'prop-types';

const DatePickerCustom = ({ handleDateChange, customStyle }) => {
    return (
        <DatePicker
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
    handleDateChange: PropTypes.func.isRequired
};

export default DatePickerCustom;
