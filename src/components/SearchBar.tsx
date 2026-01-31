import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";

import { search } from "../store/reducers/productsSlice";
import "../sass/inputs.scss";
import { AppDispatch } from "../store";

const SearchBar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [phrase, setPhrase] = useState("");

  const searchByPhrase = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhrase(e.target.value);
    dispatch(search({ phrase: e.target.value }));
  };

  return (
    <div className="search-bar">
      <input
        className="inpt inpt--search"
        value={phrase}
        placeholder="search item"
        onChange={(e) => searchByPhrase(e)}
      ></input>
      <SearchIcon className="search-bar__icon" />
    </div>
  );
};

export default SearchBar;
