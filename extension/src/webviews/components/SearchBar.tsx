import * as React from 'react';
import { renderProvider } from '../pages/sidebar';

const SearchBar: React.FC = () => {
    const [searchString, setSearchString] = React.useState('');
    const onChange = (value: string) => {
        setSearchString(value);
        renderProvider.search(value.toLowerCase());
    }
    return (
        <div className='search-bar'>
            <input placeholder='Search' value={searchString} onChange={(e) => onChange(e.target.value)} ></input>
        </div>
    )
};

export default SearchBar;