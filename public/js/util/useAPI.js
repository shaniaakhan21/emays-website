import { useState } from 'react';

const useAPI = (apiCall) => {
    const [state, setState] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);

    const callAPI = async (...args) => {
        setLoading(true);
        let response;
        try {
            response = await apiCall(...args);
            setState(response);
        } catch (error) {
            setError(error);
        }
        setLoading(false);
        return response;
    };

    return { state, error, loading, callAPI };
};

export default useAPI;
