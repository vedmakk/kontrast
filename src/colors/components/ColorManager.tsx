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
  width: '320px',
}))

const Row = styled.div(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'auto 6rem 8rem auto',
  alignItems: 'center',
  gap: theme.spacing(1),
}))

const ColorInput = styled.input(
  ({ theme }) => ({
    width: '2.25rem',
    height: '2.25rem',
    border: 'none',
    padding: 0,
    background: 'none',
    cursor: 'pointer',
    borderRadius: theme.spacing(0.5),
  }),
  focusVisibleStyles,
)

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
  }),
  focusVisibleStyles,
  {
    '&:focus-visible': {
      outlineOffset: '0px',
    },
  },
)

const Select = styled.select(
  ({ theme }) => ({
    fontFamily: 'Fira Code, monospace',
    fontSize: theme.fontSize.small,
    padding: `${theme.spacing(1)} ${theme.spacing(1)}`,
    border: `1px solid ${theme.colors.link}`,
    borderRadius: theme.spacing(0.5),
    color: theme.colors.text,
    background: theme.colors.background,
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
    <Label size="normal" as="h2">
      Colors
    </Label>
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
        <Button label="Remove" onClick={() => onRemove(c.id)} />
      </Row>
    ))}
    <Button label="Add Color" onClick={onAdd} />
  </Container>
)
