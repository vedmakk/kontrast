import React from 'react'
import styled from '@emotion/styled'

import { Color, WCAGContrastLevel } from '../types'

import { contrastRatioFor, getContrastLevel, getContrastColor } from '../utils'
import {
  ColorComfortLabel,
  colorComfortScore,
  comfortDescriptions,
  comfortLabel,
  AmbientLevel,
  ComfortScoreResult,
} from '../color-comfort'

import { InfoLabel } from '../../app/components/InfoLabel'
import { Label } from '../../app/components/Label'
import { Appear } from '../../app/components/Appear'

interface Props {
  readonly colors: readonly Color[]
  readonly isColorComfortEnabled: boolean
  readonly ambientLevel: AmbientLevel
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
    padding: theme.spacing(0.25),
    top: theme.spacing(0.5),
    left: theme.spacing(0.5),
    transition: `color ${theme.animations.transition}`,
  }),
)

const WCAGLevelLabel = styled.span<{
  level: WCAGContrastLevel
  colorComfortEnabled: boolean
}>(({ theme, level, colorComfortEnabled }) => ({
  color: theme.colors.text,
  background: theme.getWCAGLabelColor(level),
  fontSize: theme.fontSize.tiny,
  padding: theme.spacing(0.25),
  borderRadius: theme.spacing(0.5),
  position: 'absolute',
  [colorComfortEnabled ? 'top' : 'bottom']: theme.spacing(0.5),
  right: theme.spacing(0.5),
  transition: `background-color ${theme.animations.transition}, color ${theme.animations.transition}`,
}))

const ComfortLabel = styled.span<{
  textColor: string
  backgroundColor: string
}>(({ theme, textColor, backgroundColor }) => ({
  color: textColor,
  background: backgroundColor,
  fontSize: theme.fontSize.tiny,
  padding: theme.spacing(0.25),
  borderRadius: theme.spacing(0.5),
  position: 'absolute',
  bottom: theme.spacing(0.5),
  right: theme.spacing(0.5),
  transition: `background-color ${theme.animations.transition}, color ${theme.animations.transition}`,
}))

const Container = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}))

const LegendContainer = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  maxWidth: '350px',
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

export const ColorGrid: React.FC<Props> = ({
  colors,
  isColorComfortEnabled,
  ambientLevel,
}) => {
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
                <HeaderCell
                  color="transparent"
                  textColor="transparent"
                  scope="col"
                />
                {colors.map((c) => (
                  <HeaderCell
                    key={c.id}
                    color={c.color}
                    textColor={getContrastColor(c.color)}
                    scope="col"
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
                    scope="row"
                  >
                    {row.color.toUpperCase()}
                  </HeaderCell>
                  {colors.map((col) => {
                    if (row.id === col.id) {
                      return <Cell key={col.id} />
                    }

                    const bothSameType = row.type === col.type

                    const ratio = contrastRatioFor(row.color, col.color)
                    const contrastLevel = getContrastLevel(ratio)
                    const comfortResult: ComfortScoreResult = colorComfortScore(
                      row.color,
                      col.color,
                      {
                        ambient: ambientLevel,
                        backgroundIndex:
                          bothSameType || row.type === 'background' ? 0 : 1,
                      },
                    )
                    const comfortScore = comfortResult.score
                    const comfortLabelText = comfortLabel(comfortScore)

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
                        {isColorComfortEnabled && (
                          <Appear>
                            <ComfortLabel
                              textColor={
                                !bothSameType
                                  ? getContrastColor(cellStyle.background)
                                  : getContrastColor(col.color)
                              }
                              backgroundColor={
                                !bothSameType ? 'transparent' : col.color
                              }
                            >
                              {comfortLabelText}
                            </ComfortLabel>
                          </Appear>
                        )}
                        <WCAGLevelLabel
                          level={contrastLevel}
                          colorComfortEnabled={isColorComfortEnabled}
                        >
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
            <InfoLabel size="tiny" as="h3">
              WCAG 2.2 Contrast Levels
            </InfoLabel>
            <LegendItem>
              <LegendWCAGLevelLabel
                level={WCAGContrastLevel.AAA}
                colorComfortEnabled={isColorComfortEnabled}
              >
                AAA
              </LegendWCAGLevelLabel>
              <InfoLabel size="tiny">Pass AAA (7:1)</InfoLabel>
            </LegendItem>
            <LegendItem>
              <LegendWCAGLevelLabel
                level={WCAGContrastLevel.AA}
                colorComfortEnabled={isColorComfortEnabled}
              >
                AA
              </LegendWCAGLevelLabel>
              <InfoLabel size="tiny">Pass AA (4.5:1)</InfoLabel>
            </LegendItem>
            <LegendItem>
              <LegendWCAGLevelLabel
                level={WCAGContrastLevel.AA18}
                colorComfortEnabled={isColorComfortEnabled}
              >
                AA18
              </LegendWCAGLevelLabel>
              <InfoLabel size="tiny">Pass AA, Large Text Only (3:1)</InfoLabel>
            </LegendItem>
            <LegendItem>
              <LegendWCAGLevelLabel
                level={WCAGContrastLevel.FAIL}
                colorComfortEnabled={isColorComfortEnabled}
              >
                FAIL
              </LegendWCAGLevelLabel>
              <InfoLabel size="tiny">Does Not Pass</InfoLabel>
            </LegendItem>
          </LegendContainer>
          {isColorComfortEnabled && (
            <Appear>
              <LegendContainer>
                <InfoLabel size="tiny" as="h3">
                  Color Comfort Levels (experimental)
                </InfoLabel>
                <LegendItem
                  css={{ flexDirection: 'column', alignItems: 'flex-start' }}
                >
                  <Label size="tiny">{ColorComfortLabel.Optimal}</Label>
                  <InfoLabel size="tiny">
                    {comfortDescriptions[ColorComfortLabel.Optimal]}
                  </InfoLabel>
                </LegendItem>
                <LegendItem
                  css={{ flexDirection: 'column', alignItems: 'flex-start' }}
                >
                  <Label size="tiny">{ColorComfortLabel.Ok}</Label>
                  <InfoLabel size="tiny">
                    {comfortDescriptions[ColorComfortLabel.Ok]}
                  </InfoLabel>
                </LegendItem>
                <LegendItem
                  css={{ flexDirection: 'column', alignItems: 'flex-start' }}
                >
                  <Label size="tiny">{ColorComfortLabel.Harsh}</Label>
                  <InfoLabel size="tiny">
                    {comfortDescriptions[ColorComfortLabel.Harsh]}
                  </InfoLabel>
                </LegendItem>
              </LegendContainer>
            </Appear>
          )}
        </>
      )}
    </Container>
  )
}
