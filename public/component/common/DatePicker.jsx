import DatePicker from '@carbon/react/lib/components/DatePicker';
import DatePickerInput from '@carbon/react/lib/components/DatePickerInput';

const DatePickerCustom = () => {
    return (
        <DatePicker
            maxDate='09/01/2050'
            datePickerType='single'>
            <DatePickerInput placeholder='mm/dd/yyyy' />
        </DatePicker>
    );
};

export default DatePickerCustom;
