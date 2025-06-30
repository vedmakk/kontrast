import React from 'react'

import { test, expect, mock } from 'bun:test'
import { act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { render, screen } from '../../test/test-utils'
import { ThemeSwitch } from './ThemeSwitch'
import { Theme, ThemeProvider } from '@emotion/react'

test('renders without crashing', async () => {
  const toggleMock = mock(() => {})

  const Root = () => (
    <ThemeProvider
      theme={
        {
          mode: 'light',
          colors: { backdrop: '', primary: '', paper: '' },
          animations: {
            interaction: '0.1s ease-in-out',
            transition: '0.3s ease-in-out',
          },
          interactions: {
            hoverScale: 1.05,
            activeScale: 0.97,
            hoverOpacity: 1,
            activeOpacity: 0.8,
          },
          opacity: {
            disabled: 0.5,
          },
          fontSize: {
            normal: '28px',
            small: '18px',
            tiny: '14px',
            editor: '14px',
          },
          spacing: (multiplier: number) => `${multiplier * 8}px`,
        } as Partial<Theme>
      }
    >
      <ThemeSwitch size={48} selectedTheme="light" onToggleTheme={toggleMock} />
    </ThemeProvider>
  )

  render(<Root />)
  const toggler = screen.getByTestId('theme-switch')
  expect(toggler).toBeInTheDocument()

  await act(async () => {
    await userEvent.click(toggler)
    expect(toggleMock).toHaveBeenCalled()
  })
})
