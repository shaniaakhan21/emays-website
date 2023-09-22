import React, { useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const PaginationLayout = styled.div`
    ${(props) => props.styles && css`
        ${(props) => props.styles}
    `}
`;

PaginationLayout.propTypes = {
    styles: PropTypes.object
};

const PaginationContainer = ({ fullLength, wrapperStyle, resourceName, getData,
    children }) => {

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
        initialData: {}
    }
    );

    useEffect(() => {
        getData(state.currentIndex + 1, 5);
    }, [state.currentIndex]);

    const changeIndex = (value) => {
        setState({ type: 'update-current-index', data: value });
    };

    const updateInitialData = (value) => {
        setState({ type: 'update-initial-data', data: value?.overviewState });
    };
    
    return (
        <>
            {
                React.Children.map(children, child => {
                    if (React.isValidElement(child)) {
                        return React.cloneElement(child, { [resourceName]: state, updateData: updateInitialData });
                    }
                    return child;
                })
            }
            <p>{state.currentIndex}</p>
            <PaginationLayout styles={wrapperStyle}>
                {
                    Array.from({ length: state.initialData?.data?.allPagesAvailable || 0 }, (element, index) => {
                        return <button onClick={() => { changeIndex(index); }} key={index}>{index}</button>;
                    })
                }
            </PaginationLayout>
        </>
    );
};

PaginationContainer.propTypes = {
    fullLength: PropTypes.number,
    wrapperStyle: PropTypes.object,
    getData: PropTypes.func,
    resourceName: PropTypes.string,
    selector: PropTypes.object
};

export default React.memo(PaginationContainer);

