import React, { SelectHTMLAttributes } from 'react'
import styled from '@emotion/styled'

import { focusVisibleStyles } from '../../shared/styles'

const StyledSelect = styled.select(({ theme }) => {
  // encode the “#” in the color so it survives in a data URI
  const arrowColor = encodeURIComponent(theme.colors.text)
  return {
    fontFamily: 'Fira Code, monospace',
    fontSize: theme.fontSize.small,
    // give extra right‐hand padding for our custom arrow
    padding: `${theme.spacing(1)} ${theme.spacing(2)} ${theme.spacing(1)} ${theme.spacing(1)}`,
    border: `1px solid ${theme.colors.link}`,
    borderRadius: theme.spacing(0.5),
    color: theme.colors.text,
    backgroundColor: theme.colors.background,
    appearance: 'none',
    // inject a simple down‐caret SVG as the dropdown arrow
    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 6'><path fill='${arrowColor}' d='M0 0l5 6 5-6z'/></svg>")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: `right ${theme.spacing(1)} center`,
    backgroundSize: '10px',
    transition: `background-color ${theme.animations.transition}, border ${theme.animations.transition}, color ${theme.animations.transition}`,
  }
}, focusVisibleStyles)

export const Select: React.FC<SelectHTMLAttributes<HTMLSelectElement>> = (
  props,
) => <StyledSelect {...props} />
