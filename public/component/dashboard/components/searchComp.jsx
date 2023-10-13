import React, { useState } from 'react';
import { Button } from '@carbon/react';
import { Search } from '@carbon/icons-react';
import TextBoxCustom from '../../common/TextBoxCustom';
import '../../../scss/component/dashboard/history.scss';

const SearchComp = ({ searchButtonClick }) => {
    const [text, setText] = useState(null);
    return (
        <>
            <div className='search-box'>
                <TextBoxCustom
                    onChange={(e) => {
                        setText(e.target.value);
                    }}
                    placeholderText='Search ID, name, date, amount' />
                <Button onClick={() => { searchButtonClick(text); }} className='customBTN'> 
                    <div><Search /></div><div>Search</div></Button>
            </div>
        </>
    );
};

export default SearchComp;
