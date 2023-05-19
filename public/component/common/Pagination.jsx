import React, { useReducer } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const ChildWrapper = styled.div`
    ${(props) => props.styles && css`
        ${(props) => props.styles}
    `}
`;

const ButtonWrapper = styled.div`
    ${(props) => props.styles && css`
        ${ props.styles }
    `}
`;

ChildWrapper.propTypes = {
    styles: PropTypes.object
};

const Pagination = ({
    children, wrapperStyle, paginationButtonStyles
}) => {

    const childComponentArr = React.Children.toArray(children);

    const [onBoardingData, setOnBoardingData] = useReducer((onBoardingData, action) => {
        const currentIndex = onBoardingData.currentIndex;
        switch (action.type) {
            case 'next':
                const nextIndex = (() => {
                    if ((childComponentArr.length - 1) > currentIndex) {
                        return currentIndex + 1;
                    }
                    return currentIndex;
                })();
                return { ...onBoardingData, currentIndex: nextIndex };
            case 'prev':
                const prevIndex = (() => {
                    if (currentIndex === 0) {
                        return 0;
                    }
                    return currentIndex - 1;
                })();
                return { ...onBoardingData, currentIndex: prevIndex };
            case 'current':
                return { ...onBoardingData, currentIndex: action.payload };
            case 'update-data':
                // Refresh data if you need. For the moment no update requirement
                return { ...onBoardingData };
            default:
                return { ...onBoardingData };
        } 
    }, { currentIndex: 0 });

    const currentActiveChild = childComponentArr[onBoardingData.currentIndex];

    return (
        <>
            <ChildWrapper styles={wrapperStyle}>
                { currentActiveChild }
            </ChildWrapper>
            <ButtonWrapper styles={paginationButtonStyles}>
                <div className='pagination-buttons'>
                    <button onClick={() => {
                        setOnBoardingData({ type: 'prev' });
                    }}>Prev</button>
                    {
                        childComponentArr.map((item, key) => (
                            <button
                                onClick={() => {
                                    setOnBoardingData({ type: 'current', payload: key });
                                }}
                                className=''>{key + 1}</button>
                        )
                        )
                    }
                    <button onClick={() => {
                        setOnBoardingData({ type: 'next' });
                    }}>Next</button>
                </div>
            </ButtonWrapper>
        </>
    );
};

export default Pagination;
