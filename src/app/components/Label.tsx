import React from 'react'
import styled from '@emotion/styled'
import { CSSObject } from '@emotion/react'

interface LabelProps<T extends React.ElementType> {
  children: React.ReactNode
  size?: 'large' | 'normal' | 'small' | 'tiny'
  as?: T
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

export const Label = <T extends React.ElementType = 'span'>({
  children,
  size = 'normal',
  as,
  className,
  ...props
}: LabelProps<T> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof LabelProps<T>>) => {
  const Component = as || 'span'
  return (
    <StyledLabel as={Component} size={size} className={className} {...props}>
      {children}
    </StyledLabel>
  )
}
