import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { useChartsStore } from '../stores/useChartsStore'
import { ChartsAll } from './chart/ChartsAll'

const SelectBox = styled.div`
  padding: 16px 8px;

  select {
    width: 133px;
    padding: 10px 16px;
    margin-left: 18px;
    border-radius: 8px;
  }
`
export const SpendingCharts: React.FC = () => {
    const { spending, income } = useChartsStore()
    const isStart = useRef(false)
    const [select, setSelect] = useState('spending')
    return (
        <>
            <SelectBox>
                <span>类型</span>
                <select onChange={({ target }) => {
                    if (target.value === '支出')
                        setSelect('spending')

                    if (target.value === '收入')
                        setSelect('income')
                }}>
                    <option>支出</option>
                    <option>收入</option>
                </select>
            </SelectBox>
            {select === 'spending' ? <ChartsAll data={spending} isStart={isStart.current} /> : null}
            {select === 'income' ? <ChartsAll data={income} isStart={isStart.current} /> : null}
        </>
    )
}
