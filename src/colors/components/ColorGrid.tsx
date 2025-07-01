import React from 'react'
import styled from '@emotion/styled'

import { Color, WCAGContrastLevel } from '../types'

import { contrastRatioFor, getContrastLevel, getContrastColor } from '../utils'

import { InfoLabel } from '../../app/components/InfoLabel'

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
  transition: `border ${theme.animations.transition}`,
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
    transition: `border ${theme.animations.transition}`,
  }),
)

const GridTable = styled.table({
  borderCollapse: 'collapse',
})

const ContrastRatioLabel = styled.span<{ textColor: string }>(
  ({ theme, textColor }) => ({
    color: textColor,
    position: 'absolute',
    fontSize: theme.fontSize.tiny,
    top: theme.spacing(0.5),
    left: theme.spacing(0.5),
    transition: `color ${theme.animations.transition}`,
  }),
)

const WCAGLevelLabel = styled.span<{ level: WCAGContrastLevel }>(
  ({ theme, level }) => ({
    color: theme.colors.text,
    background: theme.getWCAGLabelColor(level),
    fontSize: theme.fontSize.tiny,
    padding: theme.spacing(0.25),
    borderRadius: theme.spacing(0.5),
    position: 'absolute',
    bottom: theme.spacing(0.5),
    right: theme.spacing(0.5),
    transition: `background-color ${theme.animations.transition}, color ${theme.animations.transition}`,
  }),
)

const Container = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}))

const LegendContainer = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
}))

const LegendItem = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: theme.spacing(1),
}))

const LegendWCAGLevelLabel = styled(WCAGLevelLabel)({
  position: 'relative',
  top: 'auto',
  left: 'auto',
  bottom: 'auto',
  right: 'auto',
})

export const ColorGrid: React.FC<Props> = ({ colors }) => {
  const diagonalGradient = (c1: string, c2: string) =>
    `linear-gradient(135deg, ${c1} 50%, ${c2} 50%)`

  return (
    <Container>
      <InfoLabel size="normal" as="h2">
        Color Contrast Grid
      </InfoLabel>
      {colors.length < 2 ? (
        <p>Please add at least 2 colors.</p>
      ) : (
        <>
          <GridTable>
            <thead>
              <tr>
                <HeaderCell color="transparent" textColor="transparent" />
                {colors.map((c) => (
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
              {colors.map((row) => (
                <tr key={row.id}>
                  <HeaderCell
                    color={row.color}
                    textColor={getContrastColor(row.color)}
                  >
                    {row.color.toUpperCase()}
                  </HeaderCell>
                  {colors.map((col) => {
                    if (row.id === col.id) {
                      return <Cell key={col.id} />
                    }
                    const ratio = contrastRatioFor(row.color, col.color)
                    const contrastLevel = getContrastLevel(ratio)

                    const bothSameType = row.type === col.type
                    const cellStyle = bothSameType
                      ? { background: diagonalGradient(row.color, col.color) }
                      : {
                          background:
                            row.type === 'background' ? row.color : col.color,
                          color:
                            row.type === 'background' ? col.color : row.color,
                        }

                    return (
                      <Cell
                        key={col.id}
                        style={cellStyle as React.CSSProperties}
                      >
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
                        <ContrastRatioLabel
                          textColor={
                            !bothSameType
                              ? getContrastColor(cellStyle.background)
                              : getContrastColor(row.color)
                          }
                        >
                          {ratio.toFixed(1)}
                        </ContrastRatioLabel>
                        <WCAGLevelLabel level={contrastLevel}>
                          {(() => {
                            switch (contrastLevel) {
                              case WCAGContrastLevel.AAA:
                                return 'AAA'
                              case WCAGContrastLevel.AA:
                                return 'AA'
                              case WCAGContrastLevel.AA18:
                                return 'AA18'
                              case WCAGContrastLevel.FAIL:
                                return 'FAIL'
                            }
                          })()}
                        </WCAGLevelLabel>
                      </Cell>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </GridTable>
          <LegendContainer>
            <LegendItem>
              <LegendWCAGLevelLabel level={WCAGContrastLevel.AAA}>
                AAA
              </LegendWCAGLevelLabel>
              <InfoLabel size="tiny">Pass AAA (7:1)</InfoLabel>
            </LegendItem>
            <LegendItem>
              <LegendWCAGLevelLabel level={WCAGContrastLevel.AA}>
                AA
              </LegendWCAGLevelLabel>
              <InfoLabel size="tiny">Pass AA (4.5:1)</InfoLabel>
            </LegendItem>
            <LegendItem>
              <LegendWCAGLevelLabel level={WCAGContrastLevel.AA18}>
                AA18
              </LegendWCAGLevelLabel>
              <InfoLabel size="tiny">Pass AA, Large Text Only (3:1)</InfoLabel>
            </LegendItem>
            <LegendItem>
              <LegendWCAGLevelLabel level={WCAGContrastLevel.FAIL}>
                FAIL
              </LegendWCAGLevelLabel>
              <InfoLabel size="tiny">Does Not Pass</InfoLabel>
            </LegendItem>
          </LegendContainer>
        </>
      )}
    </Container>
  )
}
