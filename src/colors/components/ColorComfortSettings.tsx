import React from 'react'
import styled from '@emotion/styled'

import { AmbientLevel, DEFAULT_AMBIENT } from '../color-comfort'
import { InfoLabel } from '../../app/components/InfoLabel'
import { Switch } from '../../app/components/Switch'
import { Select } from '../../app/components/Select'
import { Label } from '../../app/components/Label'
import { Appear } from '../../app/components/Appear'
import Tooltip from '../../app/components/Tooltip'

interface Props {
  readonly isEnabled: boolean
  readonly ambientLevel: AmbientLevel
  readonly onAmbientLevelChange: (ambientLevel: AmbientLevel) => void
  readonly onIsEnabledChange: (isEnabled: boolean) => void
}

const Container = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}))

export const ColorComfortSettings: React.FC<Props> = ({
  isEnabled,
  ambientLevel,
  onAmbientLevelChange,
  onIsEnabledChange,
}) => {
  return (
    <Container>
      <InfoLabel size="normal" as="h2">
        Color Comfort (experimental)
      </InfoLabel>
      <div css={{ width: 'fit-content' }}>
        <Tooltip label="Enables experimental color comfort scoring. Goes beyond WCAG contrast by factoring in ambient light, color harmony, and visual strain. Helps detect harsh or fatiguing combinations that pass contrast checks but may still feel uncomfortable.">
          <Switch
            label="Color Comfort Scores"
            checked={isEnabled}
            onChange={onIsEnabledChange}
            size={24}
          />
        </Tooltip>
      </div>
      {isEnabled && (
        <Appear>
          <div
            css={(theme) => ({
              display: 'flex',
              flexDirection: 'column',
              gap: theme.spacing(0.5),
              width: '250px',
            })}
          >
            <Label size="tiny" as="label" htmlFor="ambient-level">
              Ambient Level
            </Label>
            <Select
              id="ambient-level"
              value={ambientLevel}
              onChange={(e) =>
                onAmbientLevelChange(e.target.value as AmbientLevel)
              }
            >
              <option value={DEFAULT_AMBIENT}>Default (Indoor Daylight)</option>
              <option value="dark">Dark</option>
              <option value="dim">Dim</option>
              <option value="medium">Medium</option>
              <option value="bright">Bright</option>
            </Select>
          </div>
        </Appear>
      )}
    </Container>
  )
}
