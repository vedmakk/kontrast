import React, { useCallback, useRef, useState } from 'react'
import styled from '@emotion/styled'

import { outlineStyles } from '../../shared/styles'

import { Appear } from './Appear'
import { InteractiveLabel } from './InteractiveLabel'

interface Props {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
  size: number
}

const SwitchContainer = styled.label(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  gap: theme.spacing(1),
  userSelect: 'none',
}))

const SwitchWrapper = styled.div({
  position: 'relative',
  marginBottom: '1px', // Align with the label
})

const HiddenInput = styled.input({
  position: 'absolute',
  opacity: 0,
  width: 0,
  height: 0,
})

const Track = styled.div<{ checked: boolean; size: number }>(
  ({ checked, theme, size }) => ({
    width: `${size}px`,
    height: `${Math.round(size / 1.5)}px`,
    borderRadius: '16px',
    backgroundColor: checked ? theme.colors.primary : theme.colors.backdrop,
    transition: `background-color ${theme.animations.transition}`,
  }),
)

const Thumb = styled.div<{ checked: boolean; size: number }>(
  ({ checked, theme, size }) => ({
    position: 'absolute',
    top: `${Math.round(size / 10)}px`,
    left: `${Math.round(size / 10)}px`,
    width: `${Math.round(size / 1.5) - 2 * Math.round(size / 10)}px`,
    height: `${Math.round(size / 1.5) - 2 * Math.round(size / 10)}px`,
    backgroundColor:
      theme.mode === 'light'
        ? checked
          ? theme.colors.background
          : theme.colors.secondary
        : theme.colors.text,
    borderRadius: '50%',
    boxShadow: `0 1px 3px ${theme.colors.shadow}`,
    transition: `transform ${theme.animations.transition}, background-color ${theme.animations.transition}`,
    transform: checked
      ? `translateX(${Math.round(size / 3)}px)`
      : 'translateX(0)',
  }),
)

export const Switch: React.FC<Props> = ({ label, checked, onChange, size }) => {
  const [isFocusVisible, setIsFocusVisible] = useState(false)

  const checkboxRef = useRef<HTMLInputElement>(null)

  const handleFocus = useCallback(() => {
    if (checkboxRef.current?.matches(':focus-visible')) {
      setIsFocusVisible(true)
    }
  }, [])

  const handleBlur = useCallback(() => {
    setIsFocusVisible(false)
  }, [])

  return (
    <Appear>
      <SwitchContainer
        css={(theme) => (isFocusVisible ? outlineStyles(theme) : undefined)}
      >
        <SwitchWrapper>
          <HiddenInput
            ref={checkboxRef}
            id="switch-checkbox"
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <Track checked={checked} size={size} />
          <Thumb checked={checked} size={size} />
        </SwitchWrapper>
        {label && <InteractiveLabel label={label} htmlFor="switch-checkbox" />}
      </SwitchContainer>
    </Appear>
  )
}
