import React from 'react'
import { Global, Theme, CSSObject } from '@emotion/react'

const printStyles = (theme: Theme): CSSObject => ({
  '@page': {
    margin: theme.layout.pagePaddingPrint,
  },
  '@media print': {
    body: {
      printColorAdjust: 'exact',
      WebkitPrintColorAdjust: 'exact',
    },
    'html, body': {
      maxWidth: 'auto !important',
      height: 'auto !important',
      minHeight: 'auto !important',
      overflow: 'visible !important',
      backgroundColor: `${theme.colors.page} !important`,
      color: theme.colors.text,
      '& > pre': {
        padding: '0 !important',
      },
    },
  },
})

export const PrintStyles = () => (
  <>
    <Global styles={printStyles} />
  </>
)
