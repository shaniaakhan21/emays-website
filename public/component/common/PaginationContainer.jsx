import React, { useEffect, useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { useSelector } from 'react-redux';

const PaginationLayout = styled.div`
    ${(props) => props.styles && css`
        ${(props) => props.styles}
    `}
    padding-bottom: 50px;
    .button-outer {
        display: inline-flex;
        .active {
            background-color: black;
            color: white;
        }
    }
`;

PaginationLayout.propTypes = {
    styles: PropTypes.object
};

const Button = styled.button`
    height: 38px;
    width: 38px;
    background-color: #FAFAFA;
    border: 0px;
    font-size: 14px;
    font-weight: 400;
    font-family: IBM Plex Sans;
    &:hover {
        cursor: pointer;
        background-color: #e0e0e0;
    }
`;

const PaginationContainer = ({ pageLength = 5, noOfVisibleButtons = 5, wrapperStyle, resourceName, getPaginationData,
    getInitialData, isPaginationEnabled, children }) => {

    const { isSystemLoading } = useSelector((state) => ({
        isSystemLoading: state?.appInfoState?.systemInfoState?.isLoading
    }));

    const [isInitialDataLoaded, setInitialDataLoadState] = useState(false);

    const [state, setState] = useReducer((state, action) => {
        switch (action.type) {
            case 'update-current-index':
                return { ...state, currentIndex: action.data };
            case 'update-start-display-index':
                return { ...state, startDisplayIndex: action.data };
            case 'update-end-display-index':
                return { ...state, endDisplayIndex: action.data };  
            case 'update-initial-data':
                return { ...state, initialData: action.data };
            default:
                return { ...state };
        }
    }, {
        currentIndex: 0,
        startDisplayIndex: 0,
        endDisplayIndex: noOfVisibleButtons - 1,
        initialData: {},
        systemIsLoadStatus: true
    }
    );

    useEffect(() => {
        if (!isSystemLoading) {
            if (getPaginationData) {
                (async () => {
                    const data = await getPaginationData(state.currentIndex + 1, pageLength);
                    setState({ type: 'update-initial-data', data: data.payload });
                })();
                
            }
            if (getInitialData) {
                (async () => {
                    await getInitialData();
                    setInitialDataLoadState(true);
                })();
            }

            const buttonContainer = document.querySelector('.pagination .button-outer');
            if (buttonContainer) {
                buttonContainer.addEventListener('click', getActiveButtonStyle);
            }
            return () => {
                if (buttonContainer) {
                    return buttonContainer.removeEventListener('click', getActiveButtonStyle);
                }
            };
        }
        
    }, [state.currentIndex, isSystemLoading]);

    const changeIndex = (value) => {
        setState({ type: 'update-current-index', data: value });
    };

    const updateInitialData = (value) => {
        setState({ type: 'update-initial-data', data: value?.overviewState });
    };

    const getActiveButtonStyle = (event) => {
        const buttons = document.querySelectorAll('.button-outer button');
        if (buttons) {
            buttons.forEach(button => button.classList.remove('active'));
        }
        const target = event?.target;
        if (target) {
            event.target.closest('button').classList.add('active');
        }
    };

    const getInitialDataLoadedState = () => {
        if (getInitialData) {
            if (isInitialDataLoaded) {
                return true;
            } 
            return false;
        }
        return true;
    };
    
    return (
        <>
            { getInitialDataLoadedState() && <div className='pagination'>
                {
                    !isSystemLoading && React.Children.map(children, child => {
                        if (React.isValidElement(child)) {
                            return React.cloneElement(child, { [resourceName]: state, updateData: updateInitialData });
                        }
                        return child;
                    })
                }

                {
                    !isSystemLoading &&
                 isPaginationEnabled && <PaginationLayout styles={wrapperStyle}>
                        <div className='button-outer'>
                            {/* Prev button logic. */}
                            { state.startDisplayIndex > 0 && <Button
                                onClick = {() => {
                                    const prevIndex = state.currentIndex - 1;
                                    const buttons = document.querySelectorAll('.pagination button');
                                    buttons.forEach(button => button.classList.remove('active'));
                                    buttons.forEach(button => {
                                        if (+button.getAttribute('data-index') === +prevIndex) {
                                            button.classList.add('active');
                                        }
                                    });
                                    changeIndex(prevIndex);
                                    setState({ type: 'update-start-display-index', data: state.startDisplayIndex - 1 });
                                    setState({ type: 'update-end-display-index', data: state.endDisplayIndex - 1 });
                                }}>{'<'}</Button>
                            }

                            {/* Visible buttons logic. */}
                            {
                                (() => {
                                    const totalPages = state.initialData?.allPagesAvailable || 0;
                                    const buttons = [];
                                    const maxLength = totalPages > state.endDisplayIndex ?
                                        state.endDisplayIndex : totalPages - 1;
                                    for (let index = state.startDisplayIndex; index <= maxLength; index++) {
                                        buttons.push(
                                            <Button
                                                key={index}
                                                className={index === state.currentIndex ? 'active' : ''}
                                                data-index={index}
                                                onClick={() => { changeIndex(index); }}
                                            >
                                                {index + 1}
                                            </Button>
                                        );
                                    }

                                    return buttons;
                                })()
                            }

                            {/* Next button logic. */}
                            {
                                state.endDisplayIndex < (state.initialData?.allPagesAvailable - 1) && 
                        <Button 
                            onClick = {() => {
                                const nextIndex = state.currentIndex + 1;
                                const buttons = document.querySelectorAll('.pagination button');
                                buttons.forEach(button => button.classList.remove('active'));
                                buttons.forEach(button => {
                                    if (+button.getAttribute('data-index') === +nextIndex) {
                                        button.classList.add('active');
                                    }
                                });
                                changeIndex(nextIndex);
                                setState({ type: 'update-start-display-index', data: state.startDisplayIndex + 1 });
                                setState({ type: 'update-end-display-index', data: state.endDisplayIndex + 1 });
                            }}>{'>'}</Button>
                            }
                        </div>
                    </PaginationLayout>
                }
            </div>
            }
            {
                !getInitialDataLoadedState() && <div 
                    // eslint-disable-next-line max-len
                    style={{ minHeight: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <p>Loading...</p>
                </div>
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

