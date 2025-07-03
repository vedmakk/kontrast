import React from 'react'
import styled from '@emotion/styled'

import { focusVisibleStyles } from '../../shared/styles'

import { Color, ColorType } from '../types'

import { Button } from '../../app/components/Button'
import { InfoLabel } from '../../app/components/InfoLabel'
import { ColorInput } from './ColorInput'
import { Select } from '../../app/components/Select'

interface Props {
  readonly colors: readonly Color[]
  readonly onAdd: () => void
  readonly onUpdate: (
    id: string,
    changes: Partial<Pick<Color, 'color' | 'type'>>,
  ) => void
  readonly onRemove: (id: string) => void
}

const Container = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  width: 'fit-content',
}))

const Row = styled.div(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'auto 6rem 8rem auto',
  alignItems: 'center',
  gap: theme.spacing(1),
}))

const HexInput = styled.input(
  ({ theme }) => ({
    fontFamily: 'Fira Code, monospace',
    fontSize: theme.fontSize.small,
    padding: `${theme.spacing(1)} ${theme.spacing(1)}`,
    border: `1px solid ${theme.colors.link}`,
    borderRadius: theme.spacing(0.5),
    width: '6rem',
    color: theme.colors.text,
    background: theme.colors.background,
    transition: `background-color ${theme.animations.transition}, border ${theme.animations.transition}, color ${theme.animations.transition}`,
  }),
  focusVisibleStyles,
  {
    '&:focus-visible': {
      outlineOffset: '0px',
    },
  },
)

export const ColorManager: React.FC<Props> = ({
  colors,
  onAdd,
  onUpdate,
  onRemove,
}) => (
  <Container>
    <InfoLabel size="normal" as="h2">
      Colors
    </InfoLabel>
    {colors.map((c) => (
      <Row key={c.id}>
        <ColorInput
          aria-label="Pick color"
          value={c.color}
          onChange={(e) => onUpdate(c.id, { color: e.target.value })}
        />
        <HexInput
          type="text"
          aria-label="Hex color"
          value={c.color}
          onChange={(e) => onUpdate(c.id, { color: e.target.value })}
        />
        <Select
          aria-label="Color type"
          value={c.type}
          onChange={(e) =>
            onUpdate(c.id, { type: e.target.value as ColorType })
          }
        >
          <option value="background">background</option>
          <option value="foreground">foreground</option>
        </Select>
        <Button label="Remove" onClick={() => onRemove(c.id)} />
      </Row>
    ))}
    <Button label="Add Color" onClick={onAdd} />
  </Container>
)
