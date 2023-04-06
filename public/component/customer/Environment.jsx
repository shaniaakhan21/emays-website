import EnvironmentHeader from '../common/environment/EnvironmentHeader';
import IconImgText from '../common/environment/IconImgText';
import IconTextImg from '../common/environment/IconTextImg';
import ImgTextIcon from '../common/environment/ImgTextIcon';
import TextImg from '../common/environment/TextImg';
import Nav from '../common/Nav';
import ErrorBoundary from '../ErrorBoundary';

const Environment = () => {
    return (
        <ErrorBoundary>
            <Nav />
            <EnvironmentHeader />
            <IconTextImg />
            <IconImgText />
            <ImgTextIcon/>
            <TextImg/>        
        </ErrorBoundary> 
    );
};

export default Environment;
