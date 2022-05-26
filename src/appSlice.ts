import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import { IAlbum, IArtist } from './api/deezer'

interface IAppState {
  query: string,
  artist: IArtist | undefined,
  album: IAlbum | undefined
}

const initialState:IAppState = {
  query: "",
  artist: undefined,
  album: undefined,
}

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload
    },
    setArtist: (state, action: PayloadAction<IArtist | undefined>) => {
      state.artist = action.payload
      state.album  = undefined
    },
    setAlbum: (state, action: PayloadAction<IAlbum | undefined>) => {
      state.album = action.payload
    }
  }
})

export const { setQuery, setArtist, setAlbum } = appSlice.actions
export default appSlice.reducer