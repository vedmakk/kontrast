import styled from '@emotion/styled'

import { focusVisibleStyles } from '../../shared/styles'

export const Select = styled.select(
  ({ theme }) => ({
    fontFamily: 'Fira Code, monospace',
    fontSize: theme.fontSize.small,
    padding: `${theme.spacing(1)} ${theme.spacing(1)}`,
    border: `1px solid ${theme.colors.link}`,
    borderRadius: theme.spacing(0.5),
    color: theme.colors.text,
    background: theme.colors.background,
    transition: `background-color ${theme.animations.transition}, border ${theme.animations.transition}`,
  }),
  focusVisibleStyles,
)
