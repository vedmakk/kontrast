import React from 'react'

import { ColorManager as ColorManagerComponent } from '../components/ColorManager'

import { useAppDispatch } from '../../store'

import { useColors } from '../hooks'
import { addColor, updateColor, removeColor } from '../colorsSlice'

export const ColorManager = () => {
  const colors = useColors()
  const dispatch = useAppDispatch()

  const onAdd = () => dispatch(addColor())
  const onUpdate = (
    id: string,
    changes: { color?: string; type?: import('../types').ColorType },
  ) => dispatch(updateColor({ id, ...changes }))
  const onRemove = (id: string) => dispatch(removeColor(id))

  return (
    <ColorManagerComponent
      colors={colors}
      onAdd={onAdd}
      onUpdate={onUpdate}
      onRemove={onRemove}
    />
  )
}
