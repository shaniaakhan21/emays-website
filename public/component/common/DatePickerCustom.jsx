import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { PropTypes } from 'prop-types';

const DatePickerCustom = ({ handleDateChange, selectedDate, ...props }) => {
    return (
        <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat='yyyy-MM-dd'
            minDate={new Date()}
            {...props}
        />
    );
};

DatePickerCustom.propTypes = {
    ...DatePicker.propTypes,
    handleDateChange: PropTypes.func.isRequired
};

export default DatePickerCustom;
