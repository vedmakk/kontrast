import React, { useMemo } from 'react'
import styled from '@emotion/styled'
import chroma from 'chroma-js'

import { Color } from '../types'

import { Label } from '../../app/components/Label'

interface Props {
  readonly colors: readonly Color[]
}

const CELL_SIZE = '100px'

const Cell = styled.td(({ theme }) => ({
  width: CELL_SIZE,
  height: CELL_SIZE,
  border: `1px solid ${theme.colors.link}`,
  position: 'relative',
  textAlign: 'center',
  verticalAlign: 'middle',
  fontFamily: 'Fira Code, monospace',
  fontSize: theme.fontSize.normal,
  lineHeight: 1.2,
  padding: 0,
}))

const HeaderCell = styled.th<{ color: string; textColor: string }>(
  ({ theme, color, textColor }) => ({
    width: CELL_SIZE,
    height: CELL_SIZE,
    border: `1px solid ${theme.colors.link}`,
    fontFamily: 'Fira Code, monospace',
    fontSize: theme.fontSize.small,
    padding: theme.spacing(0.5),
    textAlign: 'center',
    background: color,
    color: textColor,
  }),
)

const GridTable = styled.table({
  borderCollapse: 'collapse',
})

const RatioLabel = styled.span<{ textColor: string }>(
  ({ theme, textColor }) => ({
    color: textColor,
    position: 'absolute',
    fontSize: theme.fontSize.tiny,
    top: theme.spacing(0.5),
    left: theme.spacing(0.5),
  }),
)

const PassFail = styled.span<{ pass: boolean }>(({ theme, pass }) => ({
  color: theme.colors.text,
  background: pass ? theme.colors.contrastPass : theme.colors.contrastFail,
  fontSize: theme.fontSize.tiny,
  padding: theme.spacing(0.25),
  borderRadius: theme.spacing(0.5),
  position: 'absolute',
  bottom: theme.spacing(0.5),
  right: theme.spacing(0.5),
}))

const Container = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}))

export const ColorGrid: React.FC<Props> = ({ colors }) => {
  const validColors = useMemo(() => {
    return colors.map((c) => ({
      ...c,
      color: chroma.valid(c.color) ? c.color : '#000000',
    }))
  }, [colors])

  const ratioFor = (c1: string, c2: string) => {
    try {
      return chroma.contrast(c1, c2)
    } catch {
      return 0
    }
  }

  const isPass = (ratio: number) => ratio >= 4.5

  const diagonalGradient = (c1: string, c2: string) =>
    `linear-gradient(135deg, ${c1} 50%, ${c2} 50%)`

  const getContrastColor = (color: string) => {
    const ratio = chroma.contrast(color, 'white')
    return ratio >= 4.5 ? 'white' : 'black'
  }

  if (validColors.length < 2) {
    return <p>Please add at least 2 colors to the grid.</p>
  }

  return (
    <Container>
      <Label size="normal" as="h2">
        Color Grid
      </Label>
      <GridTable>
        <thead>
          <tr>
            <HeaderCell color="transparent" textColor="transparent" />
            {validColors.map((c) => (
              <HeaderCell
                key={c.id}
                color={c.color}
                textColor={getContrastColor(c.color)}
              >
                {c.color.toUpperCase()}
              </HeaderCell>
            ))}
          </tr>
        </thead>
        <tbody>
          {validColors.map((row) => (
            <tr key={row.id}>
              <HeaderCell
                color={row.color}
                textColor={getContrastColor(row.color)}
              >
                {row.color.toUpperCase()}
              </HeaderCell>
              {validColors.map((col) => {
                if (row.id === col.id) {
                  return <Cell key={col.id} />
                }
                const ratio = ratioFor(row.color, col.color)
                const pass = isPass(ratio)

                const bothSameType = row.type === col.type
                const cellStyle = bothSameType
                  ? { background: diagonalGradient(row.color, col.color) }
                  : {
                      background:
                        row.type === 'background' ? row.color : col.color,
                      color: row.type === 'background' ? col.color : row.color,
                    }

                return (
                  <Cell key={col.id} style={cellStyle as React.CSSProperties}>
                    {!bothSameType && (
                      <span
                        style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                        }}
                      >
                        Text
                      </span>
                    )}
                    <RatioLabel textColor={getContrastColor(row.color)}>
                      {ratio.toFixed(1)}
                    </RatioLabel>
                    <PassFail pass={pass}>{pass ? 'PASS' : 'FAIL'}</PassFail>
                  </Cell>
                )
              })}
            </tr>
          ))}
        </tbody>
      </GridTable>
    </Container>
  )
}
