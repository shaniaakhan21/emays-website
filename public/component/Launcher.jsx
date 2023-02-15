import '../scss/component/launcherComponent.scss';
import Emays from '../logo/emays-logo-black.png';

const Launcher = ({ productName, productQuantity, productImage }) => {
    return (
        <section className='launchContainer'>
            <div className='grid-itm-logo'>
                <img src={Emays} height={'78px'} width={'130px'} alt='The Emays logo' />
            </div>
            <div className='grid-itm-text'>
                <p>Are you in Lombardy? <b>Try at home</b></p>
                <a href='#'>How it works?</a>
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
