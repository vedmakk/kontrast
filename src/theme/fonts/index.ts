import FiraCodeLightWoff2 from './woff2/FiraCode-Light.woff2'
import FiraCodeRegularWoff2 from './woff2/FiraCode-Regular.woff2'
import FiraCodeMediumWoff2 from './woff2/FiraCode-Medium.woff2'
import FiraCodeSemiBoldWoff2 from './woff2/FiraCode-SemiBold.woff2'
import FiraCodeBoldWoff2 from './woff2/FiraCode-Bold.woff2'
import FiraCodeVF from './woff2/FiraCode-VF.woff2'

export const fontFiraCode = [
  {
    '@font-face': {
      fontFamily: 'Fira Code',
      src: `url(${FiraCodeLightWoff2}) format('woff2')`,
      fontWeight: 300,
      fontStyle: 'normal',
      fontDisplay: 'swap',
    },
  },
  {
    '@font-face': {
      fontFamily: 'Fira Code',
      src: `url(${FiraCodeRegularWoff2}) format('woff2')`,
      fontWeight: 400,
      fontStyle: 'normal',
      fontDisplay: 'swap',
    },
  },
  {
    '@font-face': {
      fontFamily: 'Fira Code',
      src: `url(${FiraCodeMediumWoff2}) format('woff2')`,
      fontWeight: 500,
      fontStyle: 'normal',
      fontDisplay: 'swap',
    },
  },
  {
    '@font-face': {
      fontFamily: 'Fira Code',
      src: `url(${FiraCodeSemiBoldWoff2}) format('woff2')`,
      fontWeight: 600,
      fontStyle: 'normal',
      fontDisplay: 'swap',
    },
  },
  {
    '@font-face': {
      fontFamily: 'Fira Code',
      src: `url(${FiraCodeBoldWoff2}) format('woff2')`,
      fontWeight: 700,
      fontStyle: 'normal',
      fontDisplay: 'swap',
    },
  },
  {
    '@font-face': {
      fontFamily: 'Fira Code VF',
      src: `url(${FiraCodeVF}) format('woff2-variations')`,
      fontWeight: '300 700',
      fontStyle: 'normal',
      fontDisplay: 'swap',
    },
  },
]
