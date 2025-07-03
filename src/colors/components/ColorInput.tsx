import React, { useCallback, useRef, useState } from 'react'
import styled from '@emotion/styled'

import { outlineStyles } from '../../shared/styles'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  readonly value: string
}

const ColorInputLabel = styled.label<{
  value: string
  isFocusVisible: boolean
}>(({ theme, value, isFocusVisible }) => ({
  width: '2.25rem',
  height: '2.25rem',
  padding: 0,
  background: 'none',
  cursor: 'pointer',
  border: `1px solid ${theme.colors.text}`,
  borderRadius: theme.spacing(0.5),
  backgroundColor: value,
  transition: `background-color ${theme.animations.transition}, border ${theme.animations.transition}`,
  ...(isFocusVisible && outlineStyles(theme)),
}))

const HiddenNativeInput = styled.input({
  width: '2.25rem',
  height: '2.25rem',
  opacity: 0,
  cursor: 'pointer',
  border: 'none',
})

export const ColorInput: React.FC<Props> = ({ value, ...props }) => {
  const [isFocusVisible, setIsFocusVisible] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)

  const handleFocus = useCallback(() => {
    if (inputRef.current?.matches(':focus-visible')) {
      setIsFocusVisible(true)
    }
  }, [])

  const handleBlur = useCallback(() => {
    setIsFocusVisible(false)
  }, [])

  return (
    <ColorInputLabel value={value} isFocusVisible={isFocusVisible}>
      <HiddenNativeInput
        ref={inputRef}
        type="color"
        value={value}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
    </ColorInputLabel>
  )
}
