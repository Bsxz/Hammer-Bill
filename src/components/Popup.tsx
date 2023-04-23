import {useSpring} from '@react-spring/web'
import React from 'react'
import {useMenuStore} from '../stores/useMenuStore'
import {Mask} from './Mask'
import {TimeColumn} from './TimeColumn'

type Props = {
    visible: boolean
    toggle: () => void
}
export const Popup: React.FC<Props> = ({visible, toggle}) => {
    const {start, setStart} = useMenuStore()
    const popupStyles = useSpring({
        translateY: visible ? '0' : '100%',
        config: {duration: 300},
        onStart: () => {
            setStart(true)
        },
        onRest: () => {
            setStart(false)
        }
    })
    return (
        <>
            <Mask visible={visible} setStart={setStart} top="0" duration={300}
                  onMaskVisible={() => {
                      if (!start)
                          toggle()
                  }} />
            {visible ? <TimeColumn popupStyles={popupStyles} onMaskVisible={() => {
                if (!start)
                    toggle()
            }} /> : null}
        </>
    )
}
