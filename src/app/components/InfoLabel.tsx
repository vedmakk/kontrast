import styled from '@emotion/styled'

import { Label } from './Label'

export const InfoLabel = styled(Label)(({ theme }) => ({
  color: theme.colors.secondary,
  fontWeight: 400,
}))
