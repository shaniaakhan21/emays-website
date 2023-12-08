import React from 'react';
import { Tile } from '@carbon/react';

const Counts = ({ heading, value }) => {
    return (
        <>
            <div className='tile-box'>
                <Tile>
                    <h5>{heading}</h5>
                    <h2>{value}</h2>
                </Tile>
            </div>
        </>
    );
};

export default Counts;
