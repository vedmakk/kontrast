import React from 'react'
import styled from '@emotion/styled'

import { Label } from './Label'
import { ColorManager } from '../../colors/containers/ColorManager'
import { ColorGrid } from '../../colors/containers/ColorGrid'

const AppContainer = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  minHeight: '100vh',
  '@media print': {
    minHeight: 'auto',
  },
})

const LayoutContainer = styled.div(({ theme }) => ({
  margin: 0,
  width: '100%',
  position: 'relative',
  [theme.breakpoints.toolbar]: {
    width: 'fit-content',
    margin: `${theme.spacing(4)} auto`,
  },
  '@media print': {
    margin: 0,
  },
}))

const ColorContainer = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(8),
}))

export const App: React.FC = () => (
  <AppContainer>
    <LayoutContainer>
      <main>
        <Label size="large" as="h1">
          kontrast
        </Label>
        <ColorContainer>
          <ColorManager />
          <ColorGrid />
        </ColorContainer>
      </main>
    </LayoutContainer>
  </AppContainer>
)
