import PropTypes from 'prop-types';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import '../../scss/component/common/contactNumber.scss';

const ContactNumberInput = ({ actionFunc, data }) => {
    return (
        <>
            <label>Contact</label>
            <PhoneInput
                international
                defaultCountry='IT'
                onChange={(value) => {
                    actionFunc(value);
                } } 
                value = {data}
            ></PhoneInput>
        </>
    );
};

ContactNumberInput.propTypes = {
    actionFunc: PropTypes.func,
    data: PropTypes.string
};

export default ContactNumberInput;
