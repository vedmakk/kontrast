import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'

import { Color, ColorType } from './types'

import { parseColorsFromParam } from './utils'

import { AmbientLevel, DEFAULT_AMBIENT } from './color-comfort'

interface ColorComfortState {
  readonly isEnabled: boolean
  readonly ambientLevel: AmbientLevel
}

interface ColorState {
  readonly colors: Color[]
  readonly comfort: ColorComfortState
}

const DEFAULT_COLOR = '#ffffff'
const DEFAULT_TYPE: ColorType = 'background'

const newColor = (): Color => ({
  id: nanoid(),
  color: DEFAULT_COLOR,
  type: DEFAULT_TYPE,
})

const defaultColors: Color[] = [
  { id: nanoid(), color: '#f8f8f8', type: 'background' },
  { id: nanoid(), color: '#f5f0ff', type: 'background' },
  { id: nanoid(), color: '#000000', type: 'foreground' },
  { id: nanoid(), color: '#7f42ff', type: 'foreground' },
]

const getInitialColors = (): Color[] => {
  if (typeof window === 'undefined') return defaultColors
  try {
    const params = new URLSearchParams(window.location.search)
    const paramValue = params.get('colors')
    const colors = parseColorsFromParam(paramValue)
    return colors ? colors : defaultColors
  } catch {
    return defaultColors
  }
}

const initialState: ColorState = {
  colors: getInitialColors(),
  comfort: {
    isEnabled: false,
    ambientLevel: DEFAULT_AMBIENT,
  },
}

const colorsSlice = createSlice({
  name: 'colors',
  initialState,
  reducers: {
    addColor: (state) => {
      state.colors.push(newColor())
    },
    updateColor: (
      state,
      action: PayloadAction<{ id: string; color?: string; type?: ColorType }>,
    ) => {
      const { id, color, type } = action.payload
      const item = state.colors.find((c) => c.id === id)
      if (item) {
        if (typeof color === 'string') item.color = color
        if (type) item.type = type
      }
    },
    removeColor: (state, action: PayloadAction<string>) => {
      const index = state.colors.findIndex((c) => c.id === action.payload)
      if (index !== -1) state.colors.splice(index, 1)
    },
    setAmbientLevel: (state, action: PayloadAction<AmbientLevel>) => {
      state.comfort.ambientLevel = action.payload
    },
    setIsEnabled: (state, action: PayloadAction<boolean>) => {
      state.comfort.isEnabled = action.payload
    },
  },
})

export const colorsReducer = colorsSlice.reducer
export const {
  addColor,
  updateColor,
  removeColor,
  setAmbientLevel,
  setIsEnabled,
} = colorsSlice.actions
