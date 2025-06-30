import { useEffect } from 'react'

import { useAppDispatch } from '../store'

import { setTheme } from './themeSlice'

const darkModeMediaQuery = '(prefers-color-scheme: dark)'

export const useThemeTracker = () => {
  const dispatch = useAppDispatch()

  // Set the initial theme based on the system theme
  useEffect(() => {
    dispatch(
      setTheme(
        window.matchMedia(darkModeMediaQuery).matches ? 'dark' : 'light',
      ),
    )
  }, [dispatch])

  // Register a listener for the system theme change
  // to update the theme when the system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia(darkModeMediaQuery)

    const handleDarkModeChange = (e: MediaQueryListEvent) => {
      const newColorScheme = e.matches ? 'dark' : 'light'
      dispatch(setTheme(newColorScheme))
    }

    mediaQuery.addEventListener('change', handleDarkModeChange)

    return () => {
      mediaQuery.removeEventListener('change', handleDarkModeChange)
    }
  }, [dispatch])
}
