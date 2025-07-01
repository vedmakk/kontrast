import { createSelector } from '@reduxjs/toolkit'
import chroma from 'chroma-js'

import { RootState } from '../store'

export const selectColors = (state: RootState) => state.colors

export const selectValidColors = createSelector(selectColors, (colors) =>
  colors.map((c) => ({
    ...c,
    color: chroma.valid(c.color) ? c.color : '#000000', // While typing, the color may temporarily be invalid
  })),
)
