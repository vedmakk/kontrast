import React from 'react'
import { Global, Theme, CSSObject, useTheme } from '@emotion/react'

import { fontFiraCode } from '../fonts'

import { useFullMenuWidth } from '../hooks'

const globalStyles: CSSObject = {
  '*': {
    boxSizing: 'border-box',
  },
  body: {
    fontFamily: 'Fira Code, monospace',
    margin: 0,
    padding: 0,
    WebKitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
  },
  img: {
    userSelect: 'none',
  },
  '#floating-portal': {
    zIndex: 1000,
    position: 'relative',
  },
  '.sr-only': {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: '0',
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
    border: '0',
  },
}

// At first we had these styles merged with "globalStyles", which caused
// a flickering effect on text elements when changing themes on mobile.
// Assuming this was because the CSS styles were entirely replaced via
// @emotion/react's Global component, causing the font-faces to be loaded
// again. By moving changing styles to a separate Global component, we
// can avoid this flickering effect because only the changing styles are
// re-injected.
const changingGlobalStyles = (theme: Theme): CSSObject => ({
  body: {
    backgroundColor: theme.colors.background,
    color: theme.colors.text,
    transition: `background-color ${theme.animations.transition}`,
  },
})

export const GlobalStyles = () => {
  const theme = useTheme()
  const isFullMenuWidth = useFullMenuWidth()

  return (
    <>
      <meta
        name="theme-color"
        content={isFullMenuWidth ? theme.colors.background : theme.colors.page}
      />
      <Global styles={[...fontFiraCode, globalStyles]} />
      <Global styles={changingGlobalStyles} />
    </>
  )
}
