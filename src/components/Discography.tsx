import styled from "styled-components"
import { IAlbum } from '../api/deezer'

interface IDiscographyProps {
  query:string,
  onAlbumClick: (album:IAlbum) => void,
  results: IAlbum[]
}

const StyledDiscography = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  h4:first-of-type {
    color: #ddd;
    padding-bottom: 5px;
    border-bottom: 1px solid #505050;
  }

  h4:last-of-type {
    margin: 15px 0px 5px 0px;
    color: #00b2b2;
  }

  div, h4:last-of-type {
    margin-left: 10px;
  }
  
  div {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    flex: 1 1 0px;

    div {
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      min-width: 0;
      margin: 5px 10px;
      padding-bottom: 15px;
      width: 122px;
      cursor: pointer;
      white-space: nowrap;
      overflow: hidden;

      img {
        width: 122px;
      }

      h5 {
        color: #00b2b2;
        margin-top: 5px;
      }
    }

    div:first-of-type {
      margin-left: 0px;
    }

    div:last-of-type {
      margin-right: 0px;
    }
  }
`;

function Discography({query, onAlbumClick, results}:IDiscographyProps) {
  return (
    <StyledDiscography>
      <h4>{`Search results for "${query}"`}</h4>
      <h4>ALBUMS</h4>
      <div>
        {
          results.map(result => (
            <div key={result.id} onClick={() => onAlbumClick(result)}>
              <img alt="album cover" src={result.cover_medium}></img>
              <h5>{result.title}</h5>
            </div>
          ))
        }
      </div>
    </StyledDiscography>
  )
}

export default Discography