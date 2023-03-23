import { InlineLoading } from '@carbon/react';

// SCSS
import '../scss/component/loadingIndicator.scss';

const LoadingIndicator = (props) => (<div className='loading-indicator'>
    <InlineLoading {...props} />
</div>);

LoadingIndicator.prototype = InlineLoading.prototype;

export default LoadingIndicator;
