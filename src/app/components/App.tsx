import React from 'react'
import styled from '@emotion/styled'

import { Label } from './Label'

import { ThemeSwitch } from '../../theme/containers/ThemeSwitch'

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

const Header = styled.header(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(4),
}))

const ColorContainer = styled.main(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(8),
}))

export const App: React.FC = () => (
  <AppContainer>
    <LayoutContainer>
      <Header>
        <Label size="large" as="h1">
          kontrast
        </Label>
        <ThemeSwitch size={28} />
      </Header>
      <ColorContainer>
        <ColorManager />
        <ColorGrid />
      </ColorContainer>
    </LayoutContainer>
  </AppContainer>
)
