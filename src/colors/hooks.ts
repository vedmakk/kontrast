import { useAppSelector } from '../store'

import { selectColors, selectValidColors } from './selectors'

export const useColors = () => useAppSelector(selectColors)

export const useValidColors = () => useAppSelector(selectValidColors)
