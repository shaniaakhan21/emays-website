import { useState } from 'react';

const useAPI = (apiCall) => {
    const [state, setState] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);

    const callAPI = async (...args) => {
        setLoading(true);
        try {
            const response = await apiCall(...args);
            setState(response);
        } catch (error) {
            setError(error);
        }
        setLoading(false);
    };

    return { state, error, loading, callAPI };
};

export default useAPI;
