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

const Button = styled.button`
    height: 35px;
    width: 45px;
    background-color: white;
`;

const PaginationContainer = ({ fullLength, wrapperStyle, resourceName, getData,
    isPaginationEnabled, children }) => {

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

            {
                isPaginationEnabled && <PaginationLayout styles={wrapperStyle}>
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
    getData: PropTypes.func,
    resourceName: PropTypes.string,
    selector: PropTypes.object
};

export default React.memo(PaginationContainer);

