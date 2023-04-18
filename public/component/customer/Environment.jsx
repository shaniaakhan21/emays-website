import EnvironmentHeader from '../common/environment/EnvironmentHeader';
import IconImgText from '../common/environment/IconImgText';
import IconTextImg from '../common/environment/IconTextImg';
import ImgTextIcon from '../common/environment/ImgTextIcon';
import TextImg from '../common/environment/TextImg';
import Nav from '../common/Nav';

const Environment = () => {
    return (
        <>
            <Nav />
            <EnvironmentHeader />
            <IconTextImg />
            <IconImgText />
            <ImgTextIcon/>
            <TextImg/>        
        </> 
    );
};

export default Environment;
