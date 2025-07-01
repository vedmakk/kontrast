import chroma from 'chroma-js'

import { WCAGContrastLevel } from './types'

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
