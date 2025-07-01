import { css, CSSObject, Theme } from '@emotion/react'

export const outlineStyles = (theme: Theme): CSSObject => ({
  outline: `2px solid ${theme.colors.primary}`,
  outlineOffset: '2px',
  borderRadius: theme.spacing(0.25),
})

export const focusVisibleStyles = ({ theme }: { theme: Theme }) =>
  css({
    '&:focus-visible': {
      ...outlineStyles(theme),
    },
  })
