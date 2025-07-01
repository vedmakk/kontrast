import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'

import { AppTheme } from '../themeSlice'

import { focusVisibleStyles } from '../../shared/styles'

import { IconButtonWrapper } from '../../app/components/IconButtonWrapper'
import { Appear } from '../../app/components/Appear'
import { InteractiveLabel } from '../../app/components/InteractiveLabel'

export interface Props {
  readonly selectedTheme: AppTheme
  readonly onToggleTheme: () => void
  readonly size: number
}

const Orbit = styled.div<{ sunPosition: number }>(({ theme, sunPosition }) => ({
  position: 'absolute',
  bottom: '-50%',
  width: '100%',
  height: '100%',
  borderRadius: '50%',
  transition: `transform ${theme.animations.transition}`,
  transform: `rotate(${sunPosition}deg)`,
}))

const Orbiter = styled.div({
  width: '100%',
  height: '100%',
  position: 'absolute',
})

const Sun = styled(Orbiter)({
  top: '-50%',
  stroke: 'currentColor',
  strokeWidth: '0.5px',
})

const Moon = styled(Orbiter)({
  top: '50%',
  transform: 'rotate(180deg)',
})

const StyledButtonContainer = styled.button(
  ({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.spacing(1),
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    margin: 0,
    width: 'fit-content',
    height: 'fit-content',
  }),
  focusVisibleStyles,
)

export const ThemeSwitch = ({ selectedTheme, onToggleTheme, size }: Props) => {
  const [sunPosition, setSunPosition] = useState(
    selectedTheme === 'light' ? 0 : 180,
  )

  // Set the sun position based on the selected theme
  useEffect(() => {
    setSunPosition((sunPosition) => {
      // If the selected theme is light and the sun position is not at 0 or a multiple of 360 degrees, rotate the sun by 180 degrees
      if (selectedTheme === 'light' && sunPosition % 360 !== 0) {
        return sunPosition + 180
      }
      // If the selected theme is dark and the sun position is not at 180 or a multiple of 360 degrees, rotate the sun by 180 degrees
      else if (selectedTheme === 'dark' && sunPosition % 360 !== 180) {
        return sunPosition + 180
      }
      // If none of the above conditions are met, return the current sun position
      else {
        return sunPosition
      }
    })
  }, [selectedTheme, setSunPosition])

  return (
    <StyledButtonContainer onClick={onToggleTheme}>
      <Appear key={selectedTheme}>
        <InteractiveLabel
          label={selectedTheme === 'light' ? 'Light' : 'Dark'}
        />
      </Appear>
      <IconButtonWrapper size={size}>
        <Orbit data-testid="theme-switch" sunPosition={sunPosition}>
          <Sun>
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              focusable="false"
            >
              <g id="sun">
                <path
                  id="Exclude"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M24 33.0001C28.9706 33.0001 33 28.9706 33 24.0001C33 19.0295 28.9706 15.0001 24 15.0001C19.0294 15.0001 15 19.0295 15 24.0001C15 28.9706 19.0294 33.0001 24 33.0001ZM24 35.0001C30.0751 35.0001 35 30.0752 35 24.0001C35 17.9249 30.0751 13.0001 24 13.0001C17.9249 13.0001 13 17.9249 13 24.0001C13 30.0752 17.9249 35.0001 24 35.0001ZM14.7244 33.2758C15.1149 33.6663 15.1149 34.2995 14.7244 34.69L13.3934 36.021C13.0029 36.4115 12.3697 36.4115 11.9792 36.021C11.5887 35.6305 11.5887 34.9973 11.9792 34.6068L13.3102 33.2758C13.7007 32.8852 14.3339 32.8852 14.7244 33.2758ZM14.7244 14.7244C14.3339 15.1149 13.7007 15.1149 13.3102 14.7244L11.9792 13.3933C11.5887 13.0028 11.5887 12.3696 11.9792 11.9791C12.3697 11.5886 13.0029 11.5886 13.3934 11.9791L14.7244 13.3101C15.1149 13.7007 15.1149 14.3338 14.7244 14.7244ZM37.1177 24.0001C37.1177 23.4478 37.5654 23.0001 38.1177 23.0001L40.0001 23.0001C40.5523 23.0001 41.0001 23.4478 41.0001 24.0001C41.0001 24.5523 40.5523 25.0001 40.0001 25.0001L38.1177 25.0001C37.5654 25.0001 37.1177 24.5523 37.1177 24.0001ZM24 10.8824C23.4477 10.8824 23 10.4346 23 9.88235L23 8C23 7.44771 23.4477 7 24 7C24.5523 7 25 7.44772 25 8L25 9.88235C25 10.4346 24.5523 10.8824 24 10.8824ZM36.0208 11.9793C36.4114 12.3698 36.4114 13.003 36.0208 13.3935L34.6898 14.7245C34.2993 15.115 33.6661 15.115 33.2756 14.7245C32.8851 14.334 32.8851 13.7008 33.2756 13.3103L34.6066 11.9793C34.9972 11.5888 35.6303 11.5888 36.0208 11.9793ZM36.0208 36.0208C35.6303 36.4114 34.9972 36.4114 34.6066 36.0208L33.2756 34.6898C32.8851 34.2993 32.8851 33.6661 33.2756 33.2756C33.6661 32.8851 34.2993 32.8851 34.6898 33.2756L36.0208 34.6066C36.4114 34.9971 36.4114 35.6303 36.0208 36.0208ZM7 24.0001C7 23.4478 7.44772 23.0001 8 23.0001L9.88235 23.0001C10.4346 23.0001 10.8824 23.4478 10.8824 24.0001C10.8824 24.5523 10.4346 25.0001 9.88235 25.0001L8 25.0001C7.44772 25.0001 7 24.5523 7 24.0001ZM24 41.0001C23.4477 41.0001 23 40.5523 23 40.0001L23 38.1177C23 37.5654 23.4477 37.1177 24 37.1177C24.5523 37.1177 25 37.5654 25 38.1177L25 40.0001C25 40.5523 24.5523 41.0001 24 41.0001Z"
                  fill="currentColor"
                />
              </g>
            </svg>
          </Sun>
          <Moon>
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              focusable="false"
            >
              <g id="moon">
                <path
                  id="Subtract"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M30 13.6054C26.4132 15.6802 24 19.5583 24 24C24 28.4417 26.4132 32.3198 30 34.3946C28.235 35.4156 26.1857 36 24 36C17.3726 36 12 30.6274 12 24C12 17.3726 17.3726 12 24 12C26.1857 12 28.235 12.5844 30 13.6054Z"
                  fill="currentColor"
                />
              </g>
            </svg>
          </Moon>
        </Orbit>
      </IconButtonWrapper>
    </StyledButtonContainer>
  )
}
