import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { DatePicker, DatePickerInput } from '@carbon/react';

const DatePickerCustom = ({ handleDateChange, customStyle, selectedDate }) => {

    const today = new Date();

    return (
        <DatePicker
            value={selectedDate}
            maxDate='2050-01-09'
            dateFormat='Y-m-d'
            datePickerType='single'
            minDate = {today}
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
