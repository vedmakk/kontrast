import { createSelector } from '@reduxjs/toolkit'

import { RootState } from '../store'

import { DARK_THEME, LIGHT_THEME } from './theme'

export const selectTheme = (s: RootState) => s.theme

export const selectCustomTheme = createSelector(selectTheme, (theme) =>
  theme === 'light' ? LIGHT_THEME : DARK_THEME,
)
