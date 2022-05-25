import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface IArtist {
  id: number,
  link: string,
  name: string,
  nb_album: string,
  nb_fan: string,
  picture: string,
  picture_big: string,
  picture_medium: string,
  picture_small: string,
  picture_xl: string,
  radio: boolean,
  tracklist: string,
  type: string
}

interface IArtistQuery {
  data: IArtist[],
  total: number,
  next?: string
}

export interface IAlbum {
  cover: string,
  cover_big: string,
  cover_medium: string,
  cover_small: string,
  cover_xl: string,
  explicit_lyrics: boolean,
  fans: number,
  genre_id: number,
  id: number,
  link: string,
  md5_image: string,
  record_type: string,
  release_date: string,
  title: string,
  tracklist: string,
  type: string
}

interface IDiscographyQuery {
  data: IAlbum[],
  total: number,
  next?: string
}

export interface ITrack {
  id: number,
  readable: boolean,
  title: string,
  title_short: string,
  title_version: string,
  link: string,
  duration: number,
  rank: number,
  explicit_lyrics: boolean,
  preview: string,
  artist: IArtist
}

interface IAlbumTrackListQuery {
  data: ITrack[],
  total: number,
  next?: string
}

export const deezerApi = createApi({
  reducerPath: 'deezerApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://cors-anywhere.herokuapp.com/https://api.deezer.com/',
    prepareHeaders: (headers, { getState }) => {
      headers.set('Access-Control-Allow-Origin', '*')
      headers.set('Content-Type', 'text/plain;charset=UTF-8')
      
      return headers
    }
  }),
  endpoints: builder => ({
    getArtists: builder.query<IArtistQuery, string>({
      query: q => `/search/artist/?q=${q}&index=0&limit=5&output=json`,
      transformResponse: (response: {data: IArtistQuery}, meta, arg) => response.data
    }),
    getAlbums: builder.query<IDiscographyQuery, number>({
      query: artistId => `artist/${artistId}/albums?index=0&limit=5&output=json`,
      transformResponse: (response: {data: IDiscographyQuery}, meta, arg) => response.data
    }),
    getAlbumTrackList: builder.query<any, number>({
      query: albumId => `album/${albumId}/tracks?limit=1000&output=json`,
      transformResponse: (response: {data: IAlbumTrackListQuery}, meta, arg) => response.data
    }),
  }),
})

export const { useGetArtistsQuery, useGetAlbumsQuery, useGetAlbumTrackListQuery } = deezerApi