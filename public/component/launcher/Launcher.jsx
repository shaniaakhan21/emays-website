import '../../scss/component/launcherComponent.scss';
import Emays from '../../logo/emays-logo-black.png';
import PopoverCustom from '../common/PopoverCustom';
import styled from 'styled-components';

const PopoverText = () => {
    const Container = styled.div`
        font-family: 'SkolaSans';
        padding: 16px;
    `;
    return (
        <Container>
            <p>Enjoy a stress-free shopping experience right at home.
             Any unwanted items will be taking them back for you.</p>
            <b>See more...</b>
        </Container>
    );
};

const Launcher = ({ productName, productQuantity, productImage }) => {
    return (
        <section className='launchContainer'>
            <div className='grid-itm-logo'>
                <img src={Emays} height={'78px'} width={'130px'} alt='The Emays logo' />
            </div>
            <div className='grid-itm-text'>
                <p>Are you in Lombardy? <b>Try at home</b></p>
                <a href='#'>How it works?</a> 
                <PopoverCustom toggleText={'i'} toggleTextStyle={{ color: 'black', fontStyle: 'italic',
                    marginLeft: '7px', cursor: 'pointer', fontFamily: 'OpenSans' }}>
                    <PopoverText />
                </PopoverCustom>
            </div>
            <div className='grid-itm-postal-code'>
                Enter Postal Code
            </div>
            <div className='grid-itm-button'>
                button
            </div>
        </section>
    );
};

export default Launcher;
