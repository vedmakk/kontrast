import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'

import { Color, ColorType } from './types'

const DEFAULT_COLOR = '#ffffff'
const DEFAULT_TYPE: ColorType = 'background'

const newColor = (): Color => ({
  id: nanoid(),
  color: DEFAULT_COLOR,
  type: DEFAULT_TYPE,
})

const initialState: Color[] = [
  { id: nanoid(), color: '#f8f8f8', type: 'background' },
  { id: nanoid(), color: '#f5f0ff', type: 'background' },
  { id: nanoid(), color: '#000000', type: 'foreground' },
  { id: nanoid(), color: '#7f42ff', type: 'foreground' },
]

const colorsSlice = createSlice({
  name: 'colors',
  initialState,
  reducers: {
    addColor: (state) => {
      state.push(newColor())
    },
    updateColor: (
      state,
      action: PayloadAction<{ id: string; color?: string; type?: ColorType }>,
    ) => {
      const { id, color, type } = action.payload
      const item = state.find((c) => c.id === id)
      if (item) {
        if (typeof color === 'string') item.color = color
        if (type) item.type = type
      }
    },
    removeColor: (state, action: PayloadAction<string>) => {
      const index = state.findIndex((c) => c.id === action.payload)
      if (index !== -1) state.splice(index, 1)
    },
  },
})

export const colorsReducer = colorsSlice.reducer
export const { addColor, updateColor, removeColor } = colorsSlice.actions
