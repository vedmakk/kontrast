import React from 'react'
import styled from '@emotion/styled'
import { CSSObject } from '@emotion/react'

interface LabelProps {
  children: React.ReactNode
  size?: 'large' | 'normal' | 'small' | 'tiny'
  as?: React.ElementType
  className?: string
}

const StyledLabel = styled.span<{
  size?: 'large' | 'normal' | 'small' | 'tiny'
}>(({ theme, size = 'normal' }) => {
  const baseStyles: CSSObject = {
    color: theme.colors.link,
    fontFamily: 'Fira Code, monospace',
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: 'normal',
    textAlign: 'left',
    transition: `color ${theme.animations.transition}`,
  }

  const sizeStyles: CSSObject =
    size === 'large'
      ? { fontSize: theme.fontSize.large }
      : size === 'small'
        ? { fontSize: theme.fontSize.small }
        : size === 'tiny'
          ? { fontSize: theme.fontSize.tiny }
          : { fontSize: theme.fontSize.normal }

  return {
    ...baseStyles,
    ...sizeStyles,
  }
})

export const Label: React.FC<LabelProps> = ({
  children,
  size = 'normal',
  as = 'span',
  className,
}) => (
  <StyledLabel size={size} as={as} className={className}>
    {children}
  </StyledLabel>
)
