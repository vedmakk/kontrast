import React from 'react'
import styled from '@emotion/styled'

interface Props {
  children: React.ReactNode
  selector?: string
  delay?: number
}

const StyledAppear = styled.span<{ delay: number; selector?: string }>(
  ({ theme, delay, selector }) => {
    const startOpacity = delay === 0 ? 0.2 : 0
    const animationStyles = {
      animation: `appear ${theme.animations.transition}`,
      animationFillMode: 'forwards' as const,
      animationDelay: `${delay}ms`,
      opacity: startOpacity,
      '@keyframes appear': {
        '0%': { opacity: startOpacity },
        '100%': { opacity: 1 },
      },
    }

    return selector ? { [selector]: animationStyles } : animationStyles
  },
)

export const Appear: React.FC<Props> = ({ children, selector, delay = 0 }) => (
  <StyledAppear selector={selector} delay={delay}>
    {children}
  </StyledAppear>
)
