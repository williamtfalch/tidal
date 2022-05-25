import { useRef } from "react";
import styled from "styled-components"
import { ITrack, IAlbum } from '../api/deezer'

interface IAlbumProps {
  album:IAlbum,
  trackList:ITrack[]
}

const StyledAlbum = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding-top: 30px;

  h3 {
    color: #00b2b2;
    margin: 10px 0px 30px 142px;
  }

  img {
    position: absolute;
    width: 122px;
    left: 10px;
    top: 30px;
  }

  table {
    border-collapse: collapse;
    text-align: left;
    overflow:scroll;
  
    thead {
      color: white;
      border-left: 142px solid transparent;
    }

    tbody {
      background-color: #505050;
      color: #bbb;
      border-left: 142px solid #505050;
    }

    td, th {
      padding: 8px 5px;
    }

    td {
      border-bottom: 1px solid #303030;
    }

    td:first-of-type {
      width: 30px;
    }
  }
`;

function Album({album, trackList}:IAlbumProps) {
  return (
    <StyledAlbum>
      <h3>{album.title}</h3>
      <img alt="album cover" src={album.cover_medium} />
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Artist</th>
            <th>Time</th>
            <th>Released</th>
          </tr>
        </thead>

        <tbody>
            {
              trackList.map((song, i) => (
                <tr key={song.id}>
                  <td>{i + 1}</td>
                  <td>{song.title}</td>
                  <td>{song.artist.name}</td>
                  <td>{`${Math.floor(song.duration/60)}:${song.duration%60}`}</td>
                  <td>{new Date(album.release_date).getFullYear()}</td>
                </tr>
              ))
            }
          </tbody>
      </table>
    </StyledAlbum>
  )
}

export default Album