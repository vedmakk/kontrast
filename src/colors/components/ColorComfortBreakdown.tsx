import React from 'react'
import styled from '@emotion/styled'

import {
  comfortLabel,
  ComfortScoreResult,
  ComfortScoreBreakdown,
  ColorComfortLabel,
} from '../color-comfort'

import Tooltip from '../../app/components/Tooltip'
import { Label } from '../../app/components/Label'
import { InfoLabel } from '../../app/components/InfoLabel'

interface Props {
  readonly result: ComfortScoreResult
  readonly children: React.ReactNode
}

const BreakdownContainer = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}))

const ComfortScoreContainer = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
}))

const ComfortScoreLabel = styled(Label)<{ label: ColorComfortLabel }>(
  ({ theme, label }) => ({
    color: theme.getComfortLabelColor(label),
    fontWeight: 600,
  }),
)

const BreakdownList = styled.ul(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  padding: 0,
  margin: 0,
}))

const BreakdownItem = styled.li(() => ({
  listStyle: 'none',
}))

const BreakdownItemDetails = styled.details(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
}))

const BreakdownItemSummary = styled.summary(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: theme.spacing(1),
  cursor: 'pointer',
  userSelect: 'none',
  listStyle: 'none', // suppress default arrow
  '&::before': {
    content: '"▸"', // right arrow
    display: 'inline-block',
    marginRight: theme.spacing(0.1),
    transition: `transform ${theme.animations.interaction}`,
  },

  // Rotate arrow when <details> is open
  'details[open] &::before': {
    transform: 'rotate(90deg)',
  },
}))

const BreakdownItemValue = styled(Label)<{ value: number }>(
  ({ theme, value }) => ({
    color:
      value === 0
        ? theme.getComfortLabelColor(ColorComfortLabel.Optimal)
        : value > -10
          ? theme.getComfortLabelColor(ColorComfortLabel.Ok)
          : theme.getComfortLabelColor(ColorComfortLabel.Harsh),
    fontWeight: 600,
  }),
)

const HumanReadableBreakdown: Record<
  keyof ComfortScoreBreakdown,
  {
    label: string
    description: string
  }
> = {
  negativePolarity: {
    label: 'Negative Polarity',
    description:
      'Light-on-dark fonts tend to be more fatiguing than dark-on-light (negative-polarity penalty).',
  },
  ambientAdaptation: {
    label: 'Ambient Light Adaptation',
    description:
      'Penalizes mismatch between the brightest element (text in dark mode, page in light mode) and your room’s brightness.',
  },
  readability: {
    label: 'Readability',
    description:
      'WCAG contrast ratio: Baseline readability check — still a core factor.',
  },
  harmony: {
    label: 'Color Harmony',
    description:
      'Saturated complementary hues (like red on green) are visually “vibrating” and uncomfortable.',
  },
  vibrancy: {
    label: 'Vibrating Edges',
    description:
      'Highly saturated, opposing hues with similar lightness cause visual noise.',
  },
  blueLight: {
    label: 'Blue Light at Night',
    description:
      'Bright blues in dark environments are harder on the eyes than warm tones.',
  },
}

export const ColorComfortBreakdown: React.FC<Props> = ({
  result,
  children,
}) => {
  return (
    <Tooltip
      label={
        <BreakdownContainer>
          <ComfortScoreContainer>
            <InfoLabel size="tiny" as="h3" css={{ margin: 0 }}>
              Color Comfort Score
            </InfoLabel>
            <ComfortScoreLabel size="small" label={comfortLabel(result.score)}>
              {result.score} – {comfortLabel(result.score)}
            </ComfortScoreLabel>
          </ComfortScoreContainer>
          <InfoLabel
            size="tiny"
            as="h3"
            css={(theme) => ({ margin: `${theme.spacing(1)} 0 0 0` })}
          >
            Penalty Breakdown
          </InfoLabel>
          <BreakdownList>
            {Object.entries(result.reasons).map(([key, value]) => (
              <BreakdownItem key={key}>
                <BreakdownItemDetails>
                  <BreakdownItemSummary>
                    <Label size="tiny">
                      {
                        HumanReadableBreakdown[
                          key as keyof ComfortScoreBreakdown
                        ].label
                      }
                    </Label>
                    <div style={{ flex: 1 }} />
                    <BreakdownItemValue size="tiny" value={value}>
                      {value.toFixed(1)}
                    </BreakdownItemValue>
                  </BreakdownItemSummary>
                  <InfoLabel
                    size="tiny"
                    as="p"
                    css={(theme) => ({ margin: `${theme.spacing(1)} 0 0 0` })}
                  >
                    {
                      HumanReadableBreakdown[key as keyof ComfortScoreBreakdown]
                        .description
                    }
                  </InfoLabel>
                </BreakdownItemDetails>
              </BreakdownItem>
            ))}
          </BreakdownList>
        </BreakdownContainer>
      }
    >
      {children}
    </Tooltip>
  )
}
