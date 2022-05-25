import { configureStore } from '@reduxjs/toolkit'
import appReducer from './appSlice'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import { deezerApi } from './api/deezer'

export const store = configureStore({
  reducer: {
    app: appReducer,
    [deezerApi.reducerPath]: deezerApi.reducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(deezerApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch