import { useEffect, useState } from 'react';
import { handleStorage, loadLocalStorage } from './SessionStorageUtil';

const useSessionState = (key, defaultValue = undefined, removeWhenUndefined = true) => {
    const [state, setState] = useState(defaultValue);

    useEffect(() => {
        loadLocalStorage(key, setState);
    }, []);

    useEffect(() => {
        handleStorage(key, state, removeWhenUndefined);
    }, [state]);

    return [state, setState];
};

export default useSessionState;
