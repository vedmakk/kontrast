import { useAppSelector } from '../store'

import { selectColors } from './selectors'

export const useColors = () => useAppSelector(selectColors)
