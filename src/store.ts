import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'

import { themeReducer } from './theme/themeSlice'
import { colorsReducer } from './colors/colorsSlice'
import { parseColorsFromParam } from './colors/utils'

const getPreloadedState = () => {
  if (typeof window === 'undefined') return undefined
  try {
    const params = new URLSearchParams(window.location.search)
    const paramValue = params.get('colors')
    const colors = parseColorsFromParam(paramValue)
    return colors ? { colors } : undefined
  } catch {
    return undefined
  }
}

export const createStore = () =>
  configureStore({
    reducer: {
      theme: themeReducer,
      colors: colorsReducer,
    },
    preloadedState: getPreloadedState(),
  })

export const store = createStore()

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector = <T>(selector: (state: RootState) => T): T =>
  useSelector<RootState, T>(selector)
