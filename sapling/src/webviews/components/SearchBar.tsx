import * as React from 'react';
import './searchbar.css';

interface IProps {
    value: string;
    onChange: (value: string) => void
}
const SearchBar: React.FC<IProps> = ({ value, onChange }: IProps) => {
    return (
        <div className='search-bar'>
            <input ></input>
        </div>
    )
};

export default SearchBar;