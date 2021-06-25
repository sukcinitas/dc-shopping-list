import React from 'react';
import SearchIcon from '@material-ui/icons/Search';

import '../sass/inputs.scss';

const SearchBar = () => {
  return (
  <div className="search-bar">
      <input className="inpt inpt--search" placeholder="search item"></input>
      <SearchIcon className="search-bar__icon" />
  </div>
)
};

export default SearchBar;