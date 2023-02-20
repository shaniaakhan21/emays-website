import DatePicker from '@carbon/react/lib/components/DatePicker';
import DatePickerInput from '@carbon/react/lib/components/DatePickerInput';

const DatePickerCustom = ({ customStyle }) => {
    return (
        <DatePicker
            maxDate='09/01/2050'
            datePickerType='single'>
            <DatePickerInput style={customStyle} placeholder='mm/dd/yyyy' />
        </DatePicker>
    );
};

export default DatePickerCustom;
