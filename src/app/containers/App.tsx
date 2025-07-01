import React from 'react'
import { ThemeProvider } from '@emotion/react'

import { useCustomTheme } from '../../theme/hooks'

import { GlobalStyles } from '../../theme/components/GlobalStyles'
import { useThemeTracker } from '../../theme/useThemeTracker'

import { App as AppComponent } from '../components/App'

export const App = () => {
  const theme = useCustomTheme()

  useThemeTracker()

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AppComponent />
    </ThemeProvider>
  )
}
