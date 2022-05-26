import { skipToken } from "@reduxjs/toolkit/dist/query/react"
import styled from "styled-components"
import { ITrack, useGetAlbumTrackListQuery } from '../api/deezer'
import { useAppSelector } from "../hooks";
import LoadingIcon from "./LoadingIcon";

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

    tr {
      border-bottom: 1px solid #303030;
    }

    td:first-of-type {
      width: 30px;
    }

    tr:last-of-type {
      border-bottom: none;
    }
  }
`;

function Album() {
  const album                      = useAppSelector((state) => state.app.album)
  const { data, isLoading, error } = useGetAlbumTrackListQuery(album ? album.id : skipToken)

  return (
    <StyledAlbum>
      {
        album &&
          <>
            {
              isLoading &&
                <LoadingIcon />
            }

            {
              data &&
                <>
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
                        (data as unknown as ITrack[]).map((track, i) => (
                          <tr key={track.id}>
                            <td>{i + 1}</td>
                            <td>{track.title}</td>
                            <td>{track.artist.name}</td>
                            <td>{`${Math.floor(track.duration/60)}:${track.duration%60 < 10 ? `0` : ``}${track.duration%60}`}</td>
                            <td>{new Date(album.release_date).getFullYear()}</td>
                          </tr>
                        ))
                      }
                    </tbody>
                </table>
              </>
            }
          </>
      }
    </StyledAlbum>
  )
}

export default Album