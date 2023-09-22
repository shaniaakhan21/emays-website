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

const PaginationContainer = ({ fullLength, wrapperStyle, resourceName, getData, children }) => {

    const [state, setState] = useReducer((state, action) => {
        switch (action.type) {
            case 'update-current-index':
                return { ...state, currentIndex: action.data };
            case 'update-current-data':
                return { ...state, currentData: action.data };
            default:
                return { ...state };
        }
    }, {
        currentIndex: 0,
        currentData: null
    }
    );

    useEffect(() => {
        getData();
    }, []);

    const changeIndex = (value) => {
        setState({ type: 'update-current-index', data: value });
    };
    
    return (
        <>
            {
                React.Children.map(children, child => {
                    if (React.isValidElement(child)) {
                        return React.cloneElement(child, { [resourceName]: state });
                    }
                    return child;
                })
            }
            <p>{state.currentIndex}</p>
            <PaginationLayout styles={wrapperStyle}>
                {
                    Array.from({ length: fullLength }, (element, index) => {
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

