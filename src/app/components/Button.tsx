import React from 'react'
import styled from '@emotion/styled'
import { css, Theme } from '@emotion/react'

import { focusVisibleStyles } from '../../shared/styles'

import { Appear } from './Appear'

interface Props {
  label: string
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void
  href?: string
  externalLink?: boolean
  active?: boolean
  disabled?: boolean
}

export const interactiveStyles = ({ theme }: { theme: Theme }) =>
  css({
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    textAlign: 'left',
    display: 'inline-flex',
    alignItems: 'center',
    margin: 0,
    padding: 0,
    textDecoration: 'none',
    opacity: 1,
    willChange: 'transform, opacity',
    transition: `transform ${theme.animations.interaction}, opacity ${theme.animations.interaction}`,
    ':disabled': {
      opacity: theme.opacity.disabled,
      cursor: 'not-allowed',
    },
    '&:not(:disabled) .button__label:hover': {
      transition: `text-decoration-color ${theme.animations.interaction}, color ${theme.animations.interaction}`,
      color: theme.colors.primary,
      textDecorationColor: theme.colors.primary,
    },
    '@media (hover: hover) and (pointer: fine)': {
      '&:not(:disabled):active': {
        transition: 'none',
        transform: `scale(${theme.interactions.activeScale})`,
        opacity: theme.interactions.activeOpacity,
      },
    },
    '@media (hover: none) and (pointer: coarse)': {
      '&:not(:disabled):active': {
        transition: 'none',
        transform: `scale(${theme.interactions.activeScale})`,
        opacity: theme.interactions.activeOpacity,
      },
    },
  })

const StyledInteractive = styled.button(interactiveStyles, focusVisibleStyles)

export const interactiveLabelStyles = ({
  theme,
  active,
}: {
  theme: Theme
  active?: boolean
}) =>
  css({
    color: theme.colors.link,
    fontFamily: 'Fira Code, monospace',
    fontSize: theme.fontSize.small,
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: 'normal',
    textAlign: 'left',
    textDecoration: 'underline',
    textDecorationThickness: '1px',
    textDecorationColor: active ? theme.colors.primary : theme.colors.text,
    transition: `text-decoration-color ${theme.animations.interaction}, color ${theme.animations.transition}`,
  })

const StyledLabel = styled.span<{
  active: boolean
}>(interactiveLabelStyles)

export const Button: React.FC<Props> = ({
  label,
  onClick,
  href,
  externalLink = false,
  disabled = false,
  active = false,
}) => {
  const interactiveProps = href
    ? {
        as: 'a' as const,
        href: disabled ? undefined : href,
        tabIndex: disabled ? -1 : undefined,
        'aria-disabled': disabled ? true : undefined,
        target: externalLink ? '_blank' : undefined,
        rel: externalLink ? 'noreferrer' : undefined,
      }
    : {
        as: 'button' as const,
        onClick,
        disabled,
      }

  return (
    <Appear>
      <StyledInteractive {...interactiveProps}>
        <StyledLabel className="button__label" active={active}>
          {label}
        </StyledLabel>
      </StyledInteractive>
    </Appear>
  )
}
