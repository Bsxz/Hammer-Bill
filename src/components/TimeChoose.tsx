import {animated, useSpring} from '@react-spring/web'
import React, {useState} from 'react'
import styled from 'styled-components'
import {time} from '../lib/time'
import {useMenuStore} from '../stores/useMenuStore'
import {StyledGradient} from './StyledGradient'

const Div = styled(animated.div)`
  position: absolute;
  height: 50vh;
  width: 90vw;
  left: 50%;
  top: 25%;
  transform: translateX(-50%);
  box-shadow: 0 1px 1px 1px #ccc;
  background-color: #fff;
  font-size: 18px;
  z-index: 256;

  div {
    display: flex;
    padding: 16px;


    input {
      font-weight: 500;
      height: 48px;
      margin-top: 10px;
      border-radius: 8px;
      padding-left: 16px;
      font-size: inherit;
    }

    &:nth-of-type(1) {
      height: 52px;
      line-height: 52px;
      padding: 0 0 0 16px;
    }

    &:nth-of-type(2), &:nth-of-type(3) {
      flex-direction: column;
    }

    &:nth-last-child(1) {
      column-gap: 32px;
      justify-content: right;
    }
  }
`
export const TimeChoose: React.FC = (visible, toggle) => {
    const {start, setStart} = useMenuStore()
    const [popupVisible, setPopupVisible] = useState(visible)
    const [startTime, setStartTime] = useState(time().add(-3, 'month').format())
    const [endTime, setEndTime] = useState(time().format())
    const popupStyles = useSpring({
        opacity: visible ? 1 : 0,
        config: {duration: 300},
        onStart: ({value}) => {
            setStart(true)
            if (value.opacity < 0.1)
                setPopupVisible(true)
        },
        onRest: ({value}) => {
            setStart(false)
            if (value.opacity < 0.1)
                setPopupVisible(false)
        }
    })
    return (
        <Div style={{...popupStyles, visibility: (popupVisible ? 'visible' : 'hidden')}}>
            <StyledGradient>
                请选择时间
            </StyledGradient>
            <div>
                <span>开始时间</span>
                <input type="date" value={startTime} onChange={({target}) => {
                    if (target.value > endTime)
                        return
                    setStartTime(target.value)
                }} />
            </div>
            <div>
                <span>结束时间</span>
                <input type="date" value={endTime} onChange={({target}) => {
                    setEndTime(target.value)
                }} />
            </div>
            <div>
                    <span onClick={() => {
                        if (!start)
                            toggle()
                    }}>取消</span>
                <span onClick={() => {
                }}>确定</span>
            </div>
        </Div>
    )
}
