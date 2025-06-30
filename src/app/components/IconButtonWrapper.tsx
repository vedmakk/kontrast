import React from 'react'
import styled from '@emotion/styled'

import { Appear } from './Appear'

interface Props {
  size: number
  onClick?: () => void
  children: React.ReactNode
  disabled?: boolean
}

const Container = styled.div<{ size: number }>(({ theme, size }) => ({
  width: `${size}px`,
  height: `${size}px`,
  flexShrink: 0,
  borderRadius: '25%',
  overflow: 'hidden',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.colors.backdrop,
  color: theme.colors.text,
  opacity: 1,
  willChange: 'transform, color, background-color, opacity',
  transition: `transform ${theme.animations.interaction}, color ${theme.animations.interaction}, background-color ${theme.animations.interaction}, opacity ${theme.animations.interaction}`,
  '@media (hover: hover) and (pointer: fine)': {
    ':hover': {
      transform: `scale(${theme.interactions.hoverScale})`,
      color: theme.colors.primary,
      backgroundColor: theme.colors.paper,
      opacity: theme.interactions.hoverOpacity,
    },
    ':active': {
      transition: 'none',
      transform: `scale(${theme.interactions.activeScale})`,
      color: theme.colors.primary,
      backgroundColor: theme.colors.paper,
      opacity: theme.interactions.activeOpacity,
    },
  },
  '@media (hover: none) and (pointer: coarse)': {
    ':active': {
      transition: 'none',
      transform: `scale(${theme.interactions.activeScale})`,
      opacity: theme.interactions.activeOpacity,
    },
  },
  cursor: 'pointer',
}))

export const IconButtonWrapper = ({
  size,
  onClick,
  children,
  disabled,
}: Props) => (
  <Appear>
    <Container size={size} onClick={disabled ? undefined : onClick}>
      {children}
    </Container>
  </Appear>
)
