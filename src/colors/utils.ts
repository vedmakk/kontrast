import chroma from 'chroma-js'

import { WCAGContrastLevel } from './types'
import { Color, ColorType } from './types'
import { nanoid } from '@reduxjs/toolkit'

export const contrastRatioFor = (c1: string, c2: string) =>
  chroma.contrast(c1, c2)

export const getContrastLevel = (contrastRatio: number): WCAGContrastLevel => {
  if (contrastRatio >= WCAGContrastLevel.AAA) {
    return WCAGContrastLevel.AAA
  }
  if (contrastRatio >= WCAGContrastLevel.AA) {
    return WCAGContrastLevel.AA
  }
  if (contrastRatio >= WCAGContrastLevel.AA18) {
    return WCAGContrastLevel.AA18
  }
  return WCAGContrastLevel.FAIL
}

export const getContrastColor = (color: string) => {
  const ratioWhite = chroma.contrast(color, 'white')
  const ratioBlack = chroma.contrast(color, 'black')
  return ratioWhite > ratioBlack ? 'white' : 'black'
}

// Utilities for serializing/deserializing the color configuration to/from
// the URL. The encoded format is a comma-separated list of entries where each
// entry is "hex-without-#-<bg|fg>" (e.g. "f5f0ff-bg").

const TYPE_TO_CODE: Record<ColorType, 'bg' | 'fg'> = {
  background: 'bg',
  foreground: 'fg',
}
const CODE_TO_TYPE: Record<'bg' | 'fg', ColorType> = {
  bg: 'background',
  fg: 'foreground',
}

/** Encodes the given colors into a compact string suitable for a URL param. */
export const encodeColorsToParam = (colors: Color[]): string =>
  colors
    .map((c) => `${c.color.replace(/^#/, '')}-${TYPE_TO_CODE[c.type]}`)
    .join(',')

/**
 * Decodes colors from the provided query-param value. Returns `undefined` if the
 * string cannot be parsed. Any malformed entries are ignored. If no valid
 * entries are found, `undefined` is returned so the caller can fall back to
 * defaults.
 */
export const parseColorsFromParam = (
  param: string | null | undefined,
): Color[] | undefined => {
  if (!param) return undefined

  const parts = param.split(',')
  const colors: Color[] = []
  for (const part of parts) {
    const [hex, code] = part.split('-')
    if (!hex || !code) continue
    if (!(code === 'bg' || code === 'fg')) continue
    // Accept only 3, 4, 6 or 8 hex digits
    if (!/^([0-9A-Fa-f]{3,4}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/.test(hex))
      continue

    colors.push({
      id:
        typeof crypto !== 'undefined' && crypto.randomUUID
          ? crypto.randomUUID()
          : nanoid(),
      color: `#${hex}`,
      type: CODE_TO_TYPE[code],
    })
  }
  return colors.length > 0 ? colors : undefined
}
