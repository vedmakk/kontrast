import React from 'react'
import styled from '@emotion/styled'

import { ThemeSwitch } from '../../theme/containers/ThemeSwitch'

import { ColorManager } from '../../colors/containers/ColorManager'
import { ColorGrid } from '../../colors/containers/ColorGrid'
import { Label } from './Label'
import { InfoLabel } from './InfoLabel'
import { Button } from './Button'

const AppContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
})

const Header = styled.header(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(4),
  width: '100%',
  [theme.breakpoints.md]: {
    width: '400px',
  },
}))

const ContentContainer = styled.main(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.md]: {
    flexDirection: 'row',
  },
}))

const Sidebar = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(4),
  padding: theme.spacing(4),
  width: '100%',
  [theme.breakpoints.md]: {
    width: '400px',
  },
}))

const MobileGridContainer = styled.div(({ theme }) => ({
  [theme.breakpoints.md]: {
    display: 'none',
  },
}))

const GridContainer = styled.div(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'none',
  [theme.breakpoints.md]: {
    display: 'block',
  },
}))

export const App: React.FC = () => (
  <AppContainer>
    <Header>
      <Label size="large" as="h1" css={{ margin: 0 }}>
        kontrast
      </Label>
      <ThemeSwitch size={28} />
    </Header>
    <ContentContainer>
      <Sidebar>
        <section>
          <InfoLabel size="normal" as="h2">
            About
          </InfoLabel>
          <Label size="normal" as="p" css={{ margin: 0 }}>
            A multi-color contrast checker that lets you test colors across
            multiple backgrounds and UI contexts — not just for WCAG compliance,
            but for practical, system-wide accessibility.
          </Label>
        </section>
        <ColorManager />
        <MobileGridContainer>
          <ColorGrid />
        </MobileGridContainer>
        <section>
          <InfoLabel size="tiny" as="p">
            This project is open source under the MIT License.
          </InfoLabel>
          <Button
            href="https://github.com/vedmakk/kontrast"
            label="GitHub"
            externalLink
          />
        </section>
        <section>
          <InfoLabel size="tiny">
            © 2025 <br />
            Jan Mittelman
          </InfoLabel>
        </section>
      </Sidebar>
      <GridContainer>
        <ColorGrid />
      </GridContainer>
    </ContentContainer>
  </AppContainer>
)
