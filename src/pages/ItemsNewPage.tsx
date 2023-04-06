import React, {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import styled from 'styled-components'
import {Icon} from '../components/Icon'
import {Popup} from '../components/Popup'
import {RangePick} from '../components/RangePick'
import {StyledGradient} from '../components/StyledGradient'
import {StyledKeyBoard} from '../components/StyledKeyBoard'
import {TopNav} from '../components/TopNav'
import {usePopupStore} from '../stores/usePopupStore'
import {Range, Ranges, useSelectStore} from '../stores/useSelectStore'
import {Income} from './rangesPage/Income'
import {Spending} from './rangesPage/Spending'

const Div = styled.div`
  height: calc(100vh - var(--vh-offset, 0px));
  display: flex;
  flex-direction: column;
  overflow: hidden;
`
const ranges: Ranges<Range> = [
    {key: 'spending', text: '支出', element: <Spending />},
    {key: 'income', text: '收入', element: <Income />}
]
export const ItemsNewPage: React.FC = () => {
    const {select, backSelect, onChange} = useSelectStore()
    const {visible} = usePopupStore()
    const nav = useNavigate()
    const back = () => {
        onChange(backSelect)
        nav(-1)
    }
    useEffect(() => {
        onChange('spending')
    }, [])
    return (
        <Div>
            <StyledGradient>
                <TopNav title="记一笔" icon={
                    <Icon name="back" w="36" h="36" onClick={back} />
                } />
                <RangePick select={select} onChange={onChange} ranges={ranges} />
            </StyledGradient>
            {ranges.filter(v => v.key === select)[0] ? ranges.filter(v => v.key === select)[0].element : null}
            <StyledKeyBoard />
            {visible ? <Popup /> : null}
        </Div>
    )
}
