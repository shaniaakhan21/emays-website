import { useEffect, useState } from 'react';
import { createCustomSetStateFn, loadLocalStorage } from './SessionStorageUtil';

const useSessionState = (key, defaultValue = undefined, removeWhenUndefined = true) => {
    const [state, setState] = useState(defaultValue);

    const customSetStateFn = createCustomSetStateFn(key, setState, !removeWhenUndefined);

    useEffect(() => {
        loadLocalStorage(key, setState);
    }, []);

    return [state, customSetStateFn];
};

export default useSessionState;
