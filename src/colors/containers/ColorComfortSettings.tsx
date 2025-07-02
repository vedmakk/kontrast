import React, { useCallback } from 'react'

import { useAppDispatch } from '../../store'

import { useColorComfort } from '../hooks'

import { AmbientLevel } from '../color-comfort'
import { setAmbientLevel, setIsEnabled } from '../colorsSlice'

import { ColorComfortSettings as ColorComfortSettingsComponent } from '../components/ColorComfortSettings'

export const ColorComfortSettings = () => {
  const comfort = useColorComfort()

  const dispatch = useAppDispatch()

  const handleAmbientLevelChange = useCallback(
    (ambientLevel: AmbientLevel) => {
      dispatch(setAmbientLevel(ambientLevel))
    },
    [dispatch],
  )

  const handleIsEnabledChange = useCallback(
    (isEnabled: boolean) => {
      dispatch(setIsEnabled(isEnabled))
    },
    [dispatch],
  )
  return (
    <ColorComfortSettingsComponent
      isEnabled={comfort.isEnabled}
      ambientLevel={comfort.ambientLevel}
      onAmbientLevelChange={handleAmbientLevelChange}
      onIsEnabledChange={handleIsEnabledChange}
    />
  )
}
