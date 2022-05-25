import { useEffect, useRef, useState } from "react";
import styled from "styled-components"
import { IArtist } from '../api/deezer'

interface ISearchProps {
  query: string,
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  onSearchClick: () => void,
  onResultClick: (artist:IArtist) => void,
  results: IArtist[]
}

const StyledSearch = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  > div {
    position: relative;
  }

  > div > div {
    position: absolute;
    top: 45px;
    padding: 15px 10px;
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

function Search({query, onInputChange, onResultClick, onSearchClick, results}:ISearchProps) {
  const [displaySearchResults, setDisplaySearchResults] = useState<boolean>(true)
  const inputRef                                        = useRef(null)

  function _onResultClick(artistId:number) {
    onResultClick(artistId)
    setDisplaySearchResults(false)
  }

  function onInputBlur() {
    //setDisplaySearchResults(false)
  }

  useEffect(() => {
    setDisplaySearchResults(true)
  }, [results])
  

  return (
    <StyledSearch>
      <div>
        <input onChange={onInputChange} placeholder="Search here" ref={inputRef} onBlur={() => onInputBlur()} value={query} />

        {
          query && displaySearchResults && results.length > 0 &&
            <div>
              <span>Search results</span>
              <ul>
                {
                  results.map(result => <li key={result.name} onClick={() => _onResultClick(result)}>{result.name}</li>)
                }
              </ul>
            </div>
        }
      </div>
      <button onClick={onSearchClick}>SEARCH</button>
    </StyledSearch>
  )
}

export default Search