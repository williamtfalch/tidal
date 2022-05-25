import { useEffect, useState } from 'react'
import Album from './components/Album'
import Search from './components/Search'
import Discography from './components/Discography'
import StyledApp from './styles/StyledApp'
import { useGetArtistsQuery, useGetAlbumsQuery, useGetAlbumTrackListQuery, IArtist, IAlbum } from './api/deezer'
import { skipToken } from '@reduxjs/toolkit/query/react'
import { useAppDispatch, useAppSelector } from './hooks'
import { setQuery, setArtist, setAlbum } from './appSlice'

function App() {
  const dispatch  = useAppDispatch()
  const query     = useAppSelector((state) => state.app.query)
  const artist    = useAppSelector((state) => state.app.artist)
  const album     = useAppSelector((state) => state.app.album)

  const searchRequest                 = useGetArtistsQuery(query ? query : skipToken)
  const albumsRequest                 = useGetAlbumsQuery(artist ? artist.id : skipToken)
  const albumTrackListRequest         = useGetAlbumTrackListQuery(album ? album.id : skipToken)


  function onSearchInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const q = e.target.value
    
    dispatch(setQuery(q))
  }

  function onSearchResultClick(a:IArtist) {
    dispatch(setArtist(a))
  }

  function onAlbumClick(a:IAlbum) {
    dispatch(setAlbum(a))
  }

  useEffect(() => {
    if (artist) {
      dispatch(setQuery(artist.name))
      dispatch(setAlbum(undefined))
    }
  }, [artist])

  return (
    <StyledApp>
      <Search query={query} onInputChange={onSearchInputChange} onResultClick={onSearchResultClick} onSearchButtonClick={() => console.log("clicked")} results={(query && searchRequest.data) ? searchRequest.data : []} />
      {
        query && albumsRequest.data && (
          <>
            <Discography query={query} onAlbumClick={onAlbumClick} results={albumsRequest.data} />
            {
              albumTrackListRequest.data &&
                <Album album={albumsRequest.data.find(album => album.id === album.id)} trackList={albumTrackListRequest.data} />
            }
          </>
        )
      }
    </StyledApp>
  )
}

export default App
