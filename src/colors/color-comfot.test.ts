import { describe, it, expect } from 'bun:test'
import {
  colorComfortScore,
  comfortLabel,
  ColorComfortLabel,
  DEFAULT_AMBIENT,
} from './color-comfort'

/**
 * Helpers
 */
function label(c1: string, c2: string, ambient?: any) {
  return comfortLabel(colorComfortScore(c1, c2, { ambient }).score)
}

/* -------------------------------------------------------------------------- */
/* 1. Polarity & Ambient-adaptation                                           */
/* -------------------------------------------------------------------------- */
describe('Polarity + ambient adaptation', () => {
  it('white-text on black bg – OK in normal room light', () => {
    expect(label('#000', '#fff', DEFAULT_AMBIENT)).toBe(ColorComfortLabel.Ok)
  })

  it('white-text on black bg – OPTIMAL in bright ambient light', () => {
    expect(label('#000', '#fff', 'bright')).toBe(ColorComfortLabel.Optimal)
  })

  it('white-text on black bg – HARSH in dark room (glare from text)', () => {
    expect(label('#000', '#fff', 'dark')).toBe(ColorComfortLabel.Harsh)
  })

  it('black-text on white bg – HARSH in dark room (glare from page)', () => {
    expect(label('#fff', '#000', 'dark')).toBe(ColorComfortLabel.Harsh)
  })

  it('black-text on white bg – OPTIMAL in normal light', () => {
    expect(label('#fff', '#000', DEFAULT_AMBIENT)).toBe(
      ColorComfortLabel.Optimal,
    )
  })
})

/* -------------------------------------------------------------------------- */
/* 2. Readability (WCAG contrast floor)                                       */
/* -------------------------------------------------------------------------- */
describe('Contrast floor', () => {
  it('very low contrast dark-gray on black is HARSH', () => {
    expect(label('#000000', '#222222', DEFAULT_AMBIENT)).toBe(
      ColorComfortLabel.Harsh,
    )
  })

  it('medium contrast gray on black (& good ambient) is OK', () => {
    expect(label('#000000', '#919191', DEFAULT_AMBIENT)).toBe(
      ColorComfortLabel.Ok,
    )
  })
})

/* -------------------------------------------------------------------------- */
/* 3. Colour harmony & vibration                                              */
/* -------------------------------------------------------------------------- */
describe('Colour harmony / vibrating complements', () => {
  it('bright red on bright green is HARSH (saturated complements)', () => {
    expect(label('#00ff00', '#ff0000', 'medium')).toBe(ColorComfortLabel.Harsh)
  })

  it('soft pastels (low chroma) score HARSH', () => {
    expect(label('#a0c8ff', '#ffc8c8', DEFAULT_AMBIENT)).toBe(
      ColorComfortLabel.Harsh,
    )
  })

  it('highly saturated, near-complementary hues with acceptable contrast score HARSH', () => {
    expect(label('#00008b', '#ff8c00', 'bright')).toBe(ColorComfortLabel.Harsh)
  })
})

/* -------------------------------------------------------------------------- */
/* 4. Blue-light penalty in night mode                                        */
/* -------------------------------------------------------------------------- */
describe('Blue-light in dark ambient', () => {
  it('bright blue text in dark mode at night is only OK (penalised)', () => {
    expect(label('#000000', '#00bfff', 'dark')).toBe(ColorComfortLabel.Ok)
  })
})

/* -------------------------------------------------------------------------- */
/* 5. Negative-polarity penalty sanity check                                  */
/* -------------------------------------------------------------------------- */
describe('Negative-polarity baseline penalty', () => {
  it('light-gray on dark bg is lower than dark-gray on light bg', () => {
    const neg = colorComfortScore('#000', '#c8c8c8', {
      ambient: DEFAULT_AMBIENT,
    }).score // negative polarity
    const pos = colorComfortScore('#ffffff', '#404040', {
      ambient: DEFAULT_AMBIENT,
    }).score // positive polarity

    expect(neg).toBeLessThan(pos)
  })
})
