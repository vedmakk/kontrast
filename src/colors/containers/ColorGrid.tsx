import React from 'react'

import { ColorGrid as ColorGridComponent } from '../components/ColorGrid'

import { useColors } from '../hooks'

export const ColorGrid = () => {
  const colors = useColors()

  return <ColorGridComponent colors={colors} />
}
