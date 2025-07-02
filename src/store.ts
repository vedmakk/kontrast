import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'

import { themeReducer } from './theme/themeSlice'
import { colorsReducer } from './colors/colorsSlice'

export const createStore = () =>
  configureStore({
    reducer: {
      theme: themeReducer,
      colors: colorsReducer,
    },
  })

export const store = createStore()

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector = <T>(selector: (state: RootState) => T): T =>
  useSelector<RootState, T>(selector)
