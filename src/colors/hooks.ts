import { useEffect, useMemo } from 'react'
import debounce from 'lodash.debounce'

import { Color } from './types'

import { useAppSelector } from '../store'

import { encodeColorsToParam } from './utils'

import {
  selectColorComfort,
  selectColors,
  selectValidColors,
} from './selectors'

export const useColors = () => useAppSelector(selectColors)

export const useValidColors = () => useAppSelector(selectValidColors)

export const useColorComfort = () => useAppSelector(selectColorComfort)

export const useSyncColorsToUrl = () => {
  const colors = useColors()

  const debouncedUpdate = useMemo(
    () =>
      debounce((nextColors: Color[]) => {
        if (typeof window === 'undefined') return

        const param = encodeColorsToParam(nextColors)
        const url = new URL(window.location.href)

        if (param) {
          url.searchParams.set('colors', param)
        } else {
          url.searchParams.delete('colors')
        }

        // Avoid adding a new history entry on every change
        window.history.replaceState(
          null,
          '',
          `${url.pathname}${url.search}${url.hash}`,
        )
      }, 300), // 300 ms debounce delay
    [],
  )

  useEffect(() => {
    debouncedUpdate(colors)

    return () => {
      debouncedUpdate.cancel()
    }
  }, [colors, debouncedUpdate])
}
