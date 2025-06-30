import { useAppSelector } from '../store'

import { selectCustomTheme, selectTheme } from './selectors'

import { TOOLBAR_BREAKPOINT } from './theme'

// WARNING: You should never need to use this hook, it is only needed to
// initialize Emotionss `ThemeProvider` (inside `App`)
// --> You are probably looking for `useTheme` (@emotion/react)
export const useCustomTheme = () => useAppSelector(selectCustomTheme)

export const useSelectedTheme = () => useAppSelector(selectTheme)

export const useFullMenuWidth = () => {
  const isWideEnough = window.matchMedia(
    `(min-width: ${TOOLBAR_BREAKPOINT}px)`,
  ).matches

  return isWideEnough
}
