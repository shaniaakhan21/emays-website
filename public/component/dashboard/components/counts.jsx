import React from 'react';
import { Tile } from '@carbon/react';
import '../../../scss/component/dashboard/history.scss';
import { CalendarAdd, CalendarAddAlt } from '@carbon/icons-react'; 
const Counts = ({ heading, value, showCalendarIcon }) => {
    return (
        <>
            <div className='tile-box'>
                <Tile>
                    <h5>{heading}</h5>
                    <br></br>
                    <h2>{value}
                        {showCalendarIcon && (
                            <>
                                <CalendarAddAlt
                                    style={{ marginLeft: '2.25rem', width: '32px', height: '8%' }} /></>
                        )}</h2>
                </Tile>
            </div>
        </>
    );
};

export default Counts;
