import * as React from 'react';
import { DispatchContext, StateContext } from '../pages/sidebar';

const SearchBar: React.FC = () => {
    const { search } = React.useContext(StateContext);
    const dispatch = React.useContext(DispatchContext);

    const onChange = (value)=>{
        dispatch({
            type:"UPDATE_SEARCH",
            payload:value
        })
    }
    return (
        <div className='search-bar'>
            <input placeholder='Search' value={search} onChange={(e) => onChange(e.target.value)} ></input>
        </div>
    )
};

export default SearchBar;