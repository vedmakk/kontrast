export type ColorType = 'background' | 'foreground'

export interface Color {
  readonly id: string
  color: string // hex value like "#ffffff"
  type: ColorType
}

export enum WCAGContrastLevel {
  FAIL,
  AA18 = 3, // Large Text (18pt+) Threshold
  AA = 4.5,
  AAA = 7,
}
