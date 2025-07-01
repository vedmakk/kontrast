import React from 'react'

import { ColorGrid as ColorGridComponent } from '../components/ColorGrid'

import { useValidColors } from '../hooks'

export const ColorGrid = () => {
  const colors = useValidColors()

  return <ColorGridComponent colors={colors} />
}
