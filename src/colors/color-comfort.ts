// A pragmatic “visual comfort” metric for a foreground / background
// colour pair. It blends science-backed factors—ambient adaptation,
// contrast, harmony, vibrating-edge risk, and blue-light at night—
// into one 0-100 score.
import chroma from 'chroma-js'

export type AmbientLevel =
  | 'dark' // ≈ 0.1
  | 'dim' // ≈ 0.3
  | 'medium' // ≈ 0.5
  | 'bright' // ≈ 0.9
  | number // explicit 0–1 numeric

/** Internal constants */
export const DEFAULT_AMBIENT = 0.75 // “normal office / indoor daylight”
const CONTRAST_MIN = 4.5 // WCAG AA for body text
const MAX_VIBRANCY_PENALTY = 20
const MAX_HARMONY_PENALTY = 20
const LOW_CONTRAST_SPAN = CONTRAST_MIN - 1.0 // 4.5–1.0 range
const BLUE_HUE_START = 200
const BLUE_HUE_END = 260 // cyan → royal blue

/** Normalise ambient descriptor → 0-1 luminance scale */
function normaliseAmbient(a?: AmbientLevel): number {
  if (a === undefined) return DEFAULT_AMBIENT
  if (typeof a === 'number') return Math.min(1, Math.max(0, a))

  switch (a.toLowerCase()) {
    case 'dark':
      return 0.1
    case 'dim':
      return 0.3
    case 'medium':
      return 0.5
    case 'bright':
      return 0.9
    default:
      return DEFAULT_AMBIENT
  }
}

/** WCAG relative-luminance contrast ratio */
function contrastRatio(l1: number, l2: number): number {
  const [bright, dark] = l1 > l2 ? [l1, l2] : [l2, l1]
  return (bright + 0.05) / (dark + 0.05)
}

/** Shortest distance between two hue angles (0-180°) */
function hueDiff(h1: number, h2: number): number {
  if (Number.isNaN(h1) || Number.isNaN(h2)) return 0
  const diff = Math.abs(h1 - h2) % 360
  return diff > 180 ? 360 - diff : diff
}

/** Options accepted by the scoring function */
export interface ComfortOptions {
  ambient?: AmbientLevel // ambient light, optional
  backgroundIndex?: 0 | 1 // which colour is the background (default 0)
}

// Define a richer return type (score + per-factor breakdown)
export interface ComfortScoreBreakdown {
  negativePolarity: number
  ambientAdaptation: number
  readability: number
  harmony: number
  vibrancy: number
  blueLight: number
}

export interface ComfortScoreResult {
  score: number
  reasons: ComfortScoreBreakdown
}

/**
 * Compute the Color Comfort Score (0-100).
 * @param c1  Hex, rgb(), hsl()… – any chroma.js-parsable colour (background by default)
 * @param c2  Foreground text / UI element colour
 * @param opts Optional ambient + background selection
 */
export function colorComfortScore(
  c1: string,
  c2: string,
  opts: ComfortOptions = {},
): ComfortScoreResult {
  const bgFirst = opts.backgroundIndex !== 1 // default: first arg is background
  const bg = bgFirst ? chroma(c1) : chroma(c2)
  const fg = bgFirst ? chroma(c2) : chroma(c1)

  // Track individual penalties for transparency
  const reasons: ComfortScoreBreakdown = {
    negativePolarity: 0,
    ambientAdaptation: 0,
    readability: 0,
    harmony: 0,
    vibrancy: 0,
    blueLight: 0,
  }

  /* ------------------------------------------------------------------ */
  /* 1. Gather perceptual data                                          */
  /* ------------------------------------------------------------------ */
  const bgLum = bg.luminance() // 0-1
  const fgLum = fg.luminance() // 0-1
  const [Lbg, abg, bbg] = bg.lab() // Lab for chroma/hue
  const [Lfg, afg, bfg] = fg.lab()
  const Cbg = Math.hypot(abg, bbg) // Lab chroma
  const Cfg = Math.hypot(afg, bfg)
  const hueBg = bg.hcl()[0] // degrees, NaN if gray
  const hueFg = fg.hcl()[0]

  let score = 100

  // Negative polarity (light text on dark bg) is known to increase fatigue
  if (fgLum > bgLum) {
    reasons.negativePolarity = -10
    score += reasons.negativePolarity
  }

  /* ------------------------------------------------------------------ */
  /* 2. Ambient adaptation penalty                                      */
  /* ------------------------------------------------------------------ */
  const ambient = normaliseAmbient(opts.ambient)

  // Non-linear mismatch penalty (exponent > 1 => harsher for big mismatches)
  // Ambient adaptation penalty:
  //  Dark mode  → glare from the bright text
  //  Light mode → glare from the bright background
  const lumDiff =
    fgLum > bgLum
      ? Math.abs(fgLum - ambient) // negative polarity: focus on text
      : Math.abs(bgLum - ambient) // positive polarity: focus on background

  const ambientPenalty = 80 * Math.pow(lumDiff, 1.3)
  reasons.ambientAdaptation = -ambientPenalty
  score += reasons.ambientAdaptation

  /* ------------------------------------------------------------------ */
  /* 3. Readability penalty if contrast < WCAG AA                       */
  /* ------------------------------------------------------------------ */
  const cr = contrastRatio(bgLum, fgLum)
  if (cr < CONTRAST_MIN) {
    const readabilityPenalty = ((CONTRAST_MIN - cr) / LOW_CONTRAST_SPAN) * 70 // ≤70-point hit
    reasons.readability = -readabilityPenalty
    score += reasons.readability
  }

  /* ------------------------------------------------------------------ */
  /* 4. Colour harmony (large hue + chroma gaps)                        */
  /* ------------------------------------------------------------------ */
  if (Cbg > 20 && Cfg > 20) {
    // both reasonably vivid
    const hDiff = hueDiff(hueBg, hueFg) / 180 // 0-1
    const cDiff = Math.abs(Cbg - Cfg) / (Cbg + Cfg) // 0-1
    const harmonyPenalty = (0.7 * hDiff + 0.3 * cDiff) * MAX_HARMONY_PENALTY
    reasons.harmony = -harmonyPenalty
    score += reasons.harmony
  }

  /* ------------------------------------------------------------------ */
  /* 5. Vibrating-edge penalty: highly saturated complements            */
  /* ------------------------------------------------------------------ */
  const hueDistance = hueDiff(hueBg, hueFg)
  if (Cbg > 50 && Cfg > 50 && hueDistance > 150 && Math.abs(Lbg - Lfg) < 50) {
    const vibrancyPenalty = (hueDistance / 180) * MAX_VIBRANCY_PENALTY
    reasons.vibrancy = -vibrancyPenalty
    score += reasons.vibrancy
  }

  /* ------------------------------------------------------------------ */
  /* 6. Blue-light-at-night tweak                                       */
  /* ------------------------------------------------------------------ */
  if (ambient < 0.3) {
    // night / very dark
    const fgHue = hueFg
    if (
      !Number.isNaN(fgHue) &&
      fgLum > 0.3 &&
      fgHue >= BLUE_HUE_START &&
      fgHue <= BLUE_HUE_END
    ) {
      reasons.blueLight = -5
      score += reasons.blueLight // small nudge
    }
  }

  /* ------------------------------------------------------------------ */
  /* 7. Clamp and return                                                */
  /* ------------------------------------------------------------------ */
  const finalScore = Math.round(Math.max(0, Math.min(100, score)))

  return { score: finalScore, reasons }
}

export enum ColorComfortLabel {
  Optimal = 'optimal',
  Ok = 'ok',
  Harsh = 'harsh',
}

/** Optional helper: translate numeric score to a quick label */
export function comfortLabel(score: number): ColorComfortLabel {
  return score >= 80
    ? ColorComfortLabel.Optimal
    : score >= 60
      ? ColorComfortLabel.Ok
      : ColorComfortLabel.Harsh
}

export const comfortDescriptions: Record<ColorComfortLabel, string> = {
  [ColorComfortLabel.Optimal]:
    'Ideal color harmony for comfortable, extended viewing.',
  [ColorComfortLabel.Ok]:
    'Acceptable for most cases, but may cause mild strain or lack harmony in some settings.',
  [ColorComfortLabel.Harsh]:
    'Visually straining or uncomfortable — avoid for readability or prolonged use.',
}
