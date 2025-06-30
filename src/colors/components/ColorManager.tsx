import React from 'react'
import styled from '@emotion/styled'

import { Color, ColorType } from '../types'
import { Button } from '../../app/components/Button'
import { Label } from '../../app/components/Label'
import { focusVisibleStyles } from '../../shared/styles'

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
  marginTop: theme.spacing(4),
}))

const Row = styled.div(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'auto 6rem 8rem auto',
  alignItems: 'center',
  gap: theme.spacing(1),
}))

const ColorInput = styled.input(
  {
    width: '2.5rem',
    height: '2.5rem',
    border: 'none',
    padding: 0,
    background: 'none',
    cursor: 'pointer',
  },
  focusVisibleStyles,
)

const HexInput = styled.input(({ theme }) => ({
  fontFamily: 'Fira Code, monospace',
  fontSize: theme.fontSize.small,
  padding: `${theme.spacing(1)} ${theme.spacing(1)}`,
  border: `1px solid ${theme.colors.link}`,
  borderRadius: '4px',
  width: '6rem',
}))

const Select = styled.select(({ theme }) => ({
  fontFamily: 'Fira Code, monospace',
  fontSize: theme.fontSize.small,
  padding: `${theme.spacing(1)} ${theme.spacing(1)}`,
  border: `1px solid ${theme.colors.link}`,
  borderRadius: '4px',
  background: theme.colors.background,
}))

const RemoveButton = styled.button(
  ({ theme }) => ({
    background: 'none',
    border: 'none',
    color: theme.colors.link,
    cursor: 'pointer',
    fontSize: theme.fontSize.small,
    padding: theme.spacing(1),
  }),
  focusVisibleStyles,
)

export const ColorManager: React.FC<Props> = ({
  colors,
  onAdd,
  onUpdate,
  onRemove,
}) => (
  <Container>
    <Label size="large">Colors</Label>
    {colors.map((c) => (
      <Row key={c.id}>
        <ColorInput
          type="color"
          aria-label="Pick color"
          value={c.color}
          onChange={(e) => onUpdate(c.id, { color: e.target.value })}
        />
        <HexInput
          type="text"
          value={c.color}
          onChange={(e) => onUpdate(c.id, { color: e.target.value })}
        />
        <Select
          value={c.type}
          onChange={(e) =>
            onUpdate(c.id, { type: e.target.value as ColorType })
          }
        >
          <option value="background">background</option>
          <option value="foreground">foreground</option>
        </Select>
        <RemoveButton aria-label="Remove" onClick={() => onRemove(c.id)}>
          ×
        </RemoveButton>
      </Row>
    ))}
    <Button label="Add Color" onClick={onAdd} />
  </Container>
)
