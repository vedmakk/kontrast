import React, { useRef, useState } from 'react'
import styled from '@emotion/styled'
import {
  useFloating,
  useHover,
  useInteractions,
  useRole,
  useFocus,
  useDismiss,
  offset,
  flip,
  shift,
  arrow,
  autoUpdate,
  FloatingPortal,
  FloatingArrow,
  safePolygon,
} from '@floating-ui/react'
import { useTheme } from '@emotion/react'

import { Label } from './Label'

interface Props {
  label: string | React.ReactNode
  children: React.ReactNode
}

const StyledElementContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
})

const TooltipContainer = styled.div(({ theme }) => ({
  backgroundColor: theme.colors.modal,
  color: theme.colors.text,
  padding: theme.spacing(1),
  border: `1px solid ${theme.colors.primary}`,
  borderRadius: theme.spacing(1),
  width: '300px',
  maxWidth: '80vw',
  zIndex: 1000,
  transition: `background-color ${theme.animations.transition}, color ${theme.animations.transition}`,
}))

const Tooltip: React.FC<Props> = ({ label, children }) => {
  const [isOpen, setIsOpen] = useState(false)

  const arrowRef = useRef(null)

  const theme = useTheme()

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: 'bottom-start',
    // Make sure the tooltip stays on the screen
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(12),
      flip(),
      shift(),
      arrow({
        element: arrowRef,
      }),
    ],
  })

  // Event listeners to change the open state
  const hover = useHover(context, {
    move: true,
    delay: { open: 150 },
    handleClose: safePolygon(),
  })
  const focus = useFocus(context)
  const dismiss = useDismiss(context, { referencePress: true })

  // Role props for screen readers
  const role = useRole(context, { role: 'tooltip' })

  // Merge all the interactions into prop getters
  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ])

  return (
    <>
      <StyledElementContainer ref={refs.setReference} {...getReferenceProps()}>
        {children}
      </StyledElementContainer>
      <FloatingPortal id="floating-portal">
        {isOpen && (
          <div
            className="tooltip"
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
          >
            <FloatingArrow
              width={16}
              height={12}
              ref={arrowRef}
              context={context}
              fill={theme.colors.modal}
              stroke={theme.colors.primary}
              strokeWidth={1}
              tipRadius={1}
              style={{
                top: -15,
                transition: `fill ${theme.animations.transition}`,
              }}
            />
            <TooltipContainer>
              {typeof label === 'string' ? (
                <Label size="tiny">{label}</Label>
              ) : (
                label
              )}
            </TooltipContainer>
          </div>
        )}
      </FloatingPortal>
    </>
  )
}

export default Tooltip
