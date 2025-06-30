export type ColorType = 'background' | 'foreground'

export interface Color {
  readonly id: string
  color: string // hex value like "#ffffff"
  type: ColorType
}
