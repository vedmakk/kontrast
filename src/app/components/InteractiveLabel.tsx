import React from 'react'
import styled from '@emotion/styled'
import { Appear } from './Appear'
import { interactiveLabelStyles, interactiveStyles } from './Button'

interface Props {
  label: string
  onClick?: (e?: React.MouseEvent<HTMLLabelElement>) => void
  htmlFor?: string
  active?: boolean
}

const StyledInteractiveLabel = styled.label(interactiveStyles)

const StyledLabel = styled.span<{ active?: boolean }>(interactiveLabelStyles)

export const InteractiveLabel: React.FC<Props> = ({
  label,
  onClick,
  htmlFor,
  active = false,
}) => (
  <Appear>
    <StyledInteractiveLabel htmlFor={htmlFor} onClick={onClick}>
      <StyledLabel active={active}>{label}</StyledLabel>
    </StyledInteractiveLabel>
  </Appear>
)
