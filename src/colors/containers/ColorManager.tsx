import React, { useCallback } from 'react'

import { ColorType } from '../types'

import { useAppDispatch } from '../../store'
import { addColor, updateColor, removeColor } from '../colorsSlice'

import { useColors } from '../hooks'

import { ColorManager as ColorManagerComponent } from '../components/ColorManager'

export const ColorManager = () => {
  const colors = useColors()
  const dispatch = useAppDispatch()

  const onAdd = useCallback(() => dispatch(addColor()), [dispatch])

  const onUpdate = useCallback(
    (id: string, changes: { color?: string; type?: ColorType }) =>
      dispatch(updateColor({ id, ...changes })),
    [dispatch],
  )
  const onRemove = useCallback(
    (id: string) => dispatch(removeColor(id)),
    [dispatch],
  )

  return (
    <ColorManagerComponent
      colors={colors}
      onAdd={onAdd}
      onUpdate={onUpdate}
      onRemove={onRemove}
    />
  )
}
