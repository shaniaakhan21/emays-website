import React, { useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { useSelector } from 'react-redux';

const PaginationLayout = styled.div`
    ${(props) => props.styles && css`
        ${(props) => props.styles}
    `}
`;

PaginationLayout.propTypes = {
    styles: PropTypes.object
};

const Button = styled.button`
    height: 35px;
    width: 45px;
    background-color: white;
`;

const PaginationContainer = ({ fullLength, wrapperStyle, resourceName, getPaginationData,
    getInitialData, isPaginationEnabled, children }) => {

    const { isSystemLoading } = useSelector((state) => ({
        isSystemLoading: state?.appInfoState?.systemInfoState?.isLoading
    }));

    const [state, setState] = useReducer((state, action) => {
        switch (action.type) {
            case 'update-current-index':
                return { ...state, currentIndex: action.data };
            case 'update-initial-data':
                return { ...state, initialData: action.data };
            default:
                return { ...state };
        }
    }, {
        currentIndex: 0,
        initialData: {},
        systemIsLoadStatus: true
    }
    );

    useEffect(() => {
        if (!isSystemLoading) {
            if (getPaginationData) {
                getPaginationData(state.currentIndex + 1, 5);
            }
            if (getInitialData) {
                getInitialData();
            }
        }
        
    }, [state.currentIndex, isSystemLoading]);

    const changeIndex = (value) => {
        setState({ type: 'update-current-index', data: value });
    };

    const updateInitialData = (value) => {
        setState({ type: 'update-initial-data', data: value?.overviewState });
    };
    
    return (
        <>
            {
                !isSystemLoading && React.Children.map(children, child => {
                    if (React.isValidElement(child)) {
                        return React.cloneElement(child, { [resourceName]: state, updateData: updateInitialData });
                    }
                    return child;
                })
            }

            {
                !isSystemLoading && isPaginationEnabled && <PaginationLayout styles={wrapperStyle}>
                    {
                        Array.from({ length: state.initialData?.data?.allPagesAvailable || 0 }, (element, index) => {
                            return <Button 
                                onClick={() => { changeIndex(index); }} key={index}>{index}</Button>;
                        })
                    }
                </PaginationLayout>
            }
        </>
    );
};

PaginationContainer.propTypes = {
    fullLength: PropTypes.number,
    wrapperStyle: PropTypes.object,
    getPaginationData: PropTypes.func,
    resourceName: PropTypes.string,
    getInitialData: PropTypes.func,
    isPaginationEnabled: PropTypes.bool,
    dependencies: PropTypes.array
};

export default React.memo(PaginationContainer);

