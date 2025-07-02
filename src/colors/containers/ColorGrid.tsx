import React from 'react'

import { ColorGrid as ColorGridComponent } from '../components/ColorGrid'

import { useColorComfort, useValidColors } from '../hooks'

export const ColorGrid = () => {
  const colors = useValidColors()
  const comfort = useColorComfort()

  return (
    <ColorGridComponent
      colors={colors}
      isColorComfortEnabled={comfort.isEnabled}
      ambientLevel={comfort.ambientLevel}
    />
  )
}
