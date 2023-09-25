import React from 'react';
import { Button } from '@carbon/react';
import { Search } from '@carbon/icons-react';
import TextBoxCustom from '../../common/TextBoxCustom';
import '../../../scss/component/dashboard/history.scss';

const SearchComp = () => {
    return (
        <>
            <div className='search-box'>
                <TextBoxCustom
                    placeholderText='Search ID, name, date, amount' />
                <Button className='customBTN'> <div><Search /></div><div>Search</div></Button>

            </div>
        </>
    );
};

export default SearchComp;
