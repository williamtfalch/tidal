import { skipToken } from "@reduxjs/toolkit/dist/query/react";
import { useState } from "react";
import styled from "styled-components"
import { IArtist, useGetArtistsQuery } from '../api/deezer'
import { setArtist, setQuery } from "../appSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import LoadingIcon from "./LoadingIcon";

const StyledSearch = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  > .searchInputContainer {
    position: relative;

    > div {
      position: absolute;
      top: 45px;
      padding: 15px 10px;
    }
  }

  input, button {
    outline: none;
    border: none;
    border-radius: 2px;
    padding: 10px;
  }

  input, input::placeholder, > div > div {
    width: 450px;
    background-color: #383838;
    color: #999;
  }

  button {
    width: 122px;
    background-color: #00FFFF;
    color: #303030;
    cursor: pointer;
  }

  span {
    display: inline-block;
    margin-bottom: 10px;
  }

  ul {
    margin-left: 5px;
  }

  li {
    border-bottom: 1px solid #303030;
    padding: 5px 0px 5px 10px;
    cursor: pointer;
  }
`;

function Search() {
  const [displaySearchResults, setDisplaySearchResults] = useState<boolean>(true)
  const dispatch                                        = useAppDispatch()
  const query                                           = useAppSelector((state) => state.app.query)
  const { data, isLoading, error}                       = useGetArtistsQuery(query ? query : skipToken)

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const q = e.target.value
    
    dispatch(setQuery(q))
    setDisplaySearchResults(true)
  }

  function onSearchResultClick(a:IArtist) {
    dispatch(setQuery(a.name))
    dispatch(setArtist(a))
    setDisplaySearchResults(false)
  }

  return (
    <StyledSearch>
      <div className="searchInputContainer">
        <input onChange={onInputChange} placeholder="Search here" value={query} />

        {
          query && displaySearchResults &&
            <div>
              <span>Search results</span>
              {
                isLoading &&
                  <LoadingIcon />
              }

              {
                data &&
                  <ul>
                    {
                      (data as unknown as IArtist[]).map(result => <li key={result.name} onClick={() => onSearchResultClick(result)}>{result.name}</li>)
                    }
                </ul>
              }
            </div>
        }
      </div>
      <button onClick={() => console.log("Instructions unclear, must. do. something.")}>SEARCH</button>
    </StyledSearch>
  )
}

export default Search