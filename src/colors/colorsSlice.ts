import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'

import { Color, ColorType } from './types'

const DEFAULT_COLOR = '#000000'
const DEFAULT_TYPE: ColorType = 'background'

const newColor = (): Color => ({
  id:
    typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : nanoid(),
  color: DEFAULT_COLOR,
  type: DEFAULT_TYPE,
})

const colorsSlice = createSlice({
  name: 'colors',
  initialState: [] as Color[],
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
