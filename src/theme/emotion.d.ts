import '@emotion/react'
import { Theme as EmotionTheme } from '@emotion/react'

import { CustomTheme } from './theme'

declare module '@emotion/react' {
  export interface Theme extends EmotionTheme, CustomTheme {}
}
