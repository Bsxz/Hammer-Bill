import { animated, useSpring } from '@react-spring/web'
import React, { useState } from 'react'
import styled from 'styled-components'

const StyledMask = styled(animated.div)`
  position: fixed;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 128;
  background-color: rgba(0, 0, 0, 0.5);
  touch-action: none;
`
export const Mask: React.FC<Props> = ({ visible, setStart, onMaskVisible, top, duration }) => {
    const [maskVisible, setMaskVisible] = useState(visible)
    const maskStyles = useSpring({
        opacity: visible ? 1 : 0,
        config: { duration },
        onStart: ({ value }) => {
            setStart?.(true)
            if (value.opacity < 0.1)
                setMaskVisible(true)
        },
        onRest: ({ value }) => {
            setStart?.(false)
            if (value.opacity < 0.1)
                setMaskVisible(false)
        }
    })
    return (
        <StyledMask style={{
            ...maskStyles, visibility: (maskVisible ? 'visible' : 'hidden'), top
        }} onClick={onMaskVisible}></StyledMask>
    )
}
