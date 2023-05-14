import React, { useRef } from 'react'
import styled from 'styled-components'
import type { ChartData } from '../stores/store'
import type { Range } from '../stores/useSelectStore'
import { ChartsAll } from './chart/ChartsAll'

type Props = {
    data: ChartData
    setKind: (v: Range) => void
}
const SelectBox = styled.div`
  padding: 16px 8px;

  select {
    width: 133px;
    padding: 10px 16px;
    margin-left: 18px;
    border-radius: 8px;
  }
`
export const Tag: React.FC<Props> = (props) => {
    const { data, setKind } = props
    const isStart = useRef(false)
    return (
        <>
            <SelectBox>
                <span>类型</span>
                <select
                    onChange={({ target }) => {
                        if (target.value === '支出') setKind('expenses')

                        if (target.value === '收入') setKind('income')
                    }}>
                    <option>支出</option>
                    <option>收入</option>
                </select>
            </SelectBox>
            <ChartsAll data={data} isStart={isStart.current} />
        </>
    )
}
