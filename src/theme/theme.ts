import { ColorComfortLabel } from '../colors/color-comfort'
import { WCAGContrastLevel } from '../colors/types'

const SPACING_UNIT = 8
const ANIMATION_DURATION_SHORT = 0.1
const ANIMATION_DURATION_LONG = 0.4

const TOOLBAR_WIDTH = 305
const PAGE_WIDTH = 794 // A4 width = 8.27 × 96 (DPI) ≈ 794px
const PAGE_HEIGHT = 1123 // A4 height = 11.69 × 96 (DPI) ≈ 1123px
const PAGE_PADDING = 75 // 20mm at 96dpi = 0.787402 * 96 = 75.590592px
const PAGE_PADDING_PRINT = 20 // 20mm

export const TOOLBAR_BREAKPOINT = PAGE_WIDTH + 2 * TOOLBAR_WIDTH

const breakpoints = {
  sm: '@media screen and (min-width: 0px)',
  md: '@media screen and (min-width: 768px)',
  page: `@media screen and (min-width: ${PAGE_WIDTH}px)`,
  toolbar: `@media screen and (min-width: ${TOOLBAR_BREAKPOINT}px)`,
  lg: '@media screen and (min-width: 1024px)',
  xl: '@media screen and (min-width: 1440px)',
}

const contrastColorFnFactory =
  (colors: string[]) => (level: WCAGContrastLevel) => {
    switch (level) {
      case WCAGContrastLevel.AAA:
        return colors[0]
      case WCAGContrastLevel.AA:
        return colors[1]
      case WCAGContrastLevel.AA18:
        return colors[2]
      case WCAGContrastLevel.FAIL:
        return colors[3]
    }
  }

const comfortColorFnFactory =
  (colors: string[]) => (label: ColorComfortLabel) => {
    switch (label) {
      case ColorComfortLabel.Optimal:
        return colors[0]
      case ColorComfortLabel.Ok:
        return colors[1]
      case ColorComfortLabel.Harsh:
        return colors[2]
    }
  }

interface BaseTheme {
  breakpoints: {
    sm: string
    md: string
    page: string
    toolbar: string
    lg: string
    xl: string
  }
  animations: {
    interaction: string
    transition: string
    stepsDuration: string
    tickStepsDuration: string
  }
  interactions: {
    hoverScale: number
    activeScale: number
    hoverOpacity: number
    activeOpacity: number
  }
  spacing: (multiplier: number) => string
  layout: {
    toolbarWidth: string
    pageWidth: string
    pageHeight: string
    pagePadding: string
    pagePaddingPrint: string
  }
  fontSize: {
    large: string
    normal: string
    small: string
    tiny: string
    editor: string
    kbd: string
  }
}

export type CustomTheme = BaseTheme & {
  mode: 'light' | 'dark'
  colors: {
    primary: string
    secondary: string
    title: string
    text: string
    link: string
    backdrop: string
    paper: string
    background: string
    page: string
    shadow: string
    modal: string
    modalBackdrop: string
  }
  opacity: {
    disabled: number
  }
  getWCAGLabelColor: (level: WCAGContrastLevel) => string
  getComfortLabelColor: (label: ColorComfortLabel) => string
}

const BASE_THEME: BaseTheme = {
  breakpoints,
  animations: {
    interaction: `${ANIMATION_DURATION_SHORT}s ease-in-out`,
    transition: `${ANIMATION_DURATION_LONG}s ease-in-out`,
    stepsDuration: `${ANIMATION_DURATION_LONG}s`,
    tickStepsDuration: `${ANIMATION_DURATION_SHORT * 2}s`,
  },
  interactions: {
    hoverScale: 1.05,
    activeScale: 0.97,
    hoverOpacity: 1,
    activeOpacity: 0.8,
  },
  spacing: (multiplier: number) => `${multiplier * SPACING_UNIT}px`,
  layout: {
    toolbarWidth: `${TOOLBAR_WIDTH}px`,
    pageWidth: `${PAGE_WIDTH}px`,
    pageHeight: `${PAGE_HEIGHT}px`,
    pagePadding: `${PAGE_PADDING}px`,
    pagePaddingPrint: `${PAGE_PADDING_PRINT}mm !important`,
  },
  fontSize: {
    large: '1.5rem',
    normal: '1rem',
    small: '0.875rem',
    tiny: '0.75rem',
    editor: '1rem',
    kbd: '0.6rem',
  },
}

export const LIGHT_THEME: CustomTheme = {
  ...BASE_THEME,
  mode: 'light',
  colors: {
    primary: '#7f42ff',
    secondary: 'rgba(55, 55, 55, 0.7)',
    title: '#000000',
    text: '#000000',
    link: '#000000',
    backdrop: 'rgba(0, 0, 0, 0.075)',
    paper: '#f5f0ff',
    background: '#f8f8f8',
    page: '#ffffff',
    shadow: 'rgba(0, 0, 0, 0.1)',
    modal: '#ffffff',
    modalBackdrop: 'rgba(255, 255, 255, 0.8)',
  },
  opacity: {
    disabled: 0.5,
  },
  getWCAGLabelColor: contrastColorFnFactory([
    '#008578',
    '#21854b',
    '#9e6c00',
    '#d73b43',
  ]),
  getComfortLabelColor: comfortColorFnFactory([
    '#008578',
    '#21854b',
    '#9e6c00',
  ]),
}

export const DARK_THEME: CustomTheme = {
  ...BASE_THEME,
  mode: 'dark',
  colors: {
    primary: '#9c6dff',
    secondary: 'rgba(200, 200, 200, 0.7)',
    title: '#ffffff',
    text: '#ffffff',
    link: '#ffffff',
    backdrop: 'rgba(255, 255, 255, 0.1)',
    paper: '#13003d',
    background: '#1c1c1c',
    page: '#000000',
    shadow: 'rgba(255, 255, 255, 0.05)',
    modal: '#000000',
    modalBackdrop: 'rgba(34, 34, 34, 0.9)',
  },
  opacity: {
    disabled: 0.5,
  },
  getWCAGLabelColor: contrastColorFnFactory([
    '#008578',
    '#21854b',
    '#9e6c00',
    '#d73b43',
  ]),
  getComfortLabelColor: comfortColorFnFactory([
    '#008578',
    '#21854b',
    '#9e6c00',
  ]),
}
