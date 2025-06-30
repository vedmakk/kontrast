import React from 'react'

import { ThemeSwitch as ThemeSwitchComponent } from '../components/ThemeSwitch'

import { useAppDispatch } from '../../store'

import { toggleTheme } from '../themeSlice'
import { useSelectedTheme } from '../hooks'

interface Props {
  readonly size: number
}

export const ThemeSwitch = ({ size }: Props) => {
  const selectedTheme = useSelectedTheme()
  const dispatch = useAppDispatch()

  const onToggleTheme = () => dispatch(toggleTheme())

  return (
    <ThemeSwitchComponent
      size={size}
      selectedTheme={selectedTheme}
      onToggleTheme={onToggleTheme}
    />
  )
}
