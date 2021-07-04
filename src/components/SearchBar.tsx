import React, { useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { useDispatch } from 'react-redux';

import {
  search
} from '../store/reducers/productsSlice';
import '../sass/inputs.scss';

const SearchBar = () => {
  const dispatch = useDispatch();
  const [phrase, setPhrase] = useState('');

  const searchByPhrase = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhrase(e.target.value);
    dispatch(search({ phrase: e.target.value }));
  }

  return (
  <div className="search-bar">
      <input className="inpt inpt--search" value={phrase} placeholder="search item" onChange={(e) => searchByPhrase(e)}></input>
      <SearchIcon className="search-bar__icon" />
  </div>
)
};

export default SearchBar;