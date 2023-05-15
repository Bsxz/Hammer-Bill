import React, { useRef } from 'react'
import styled from 'styled-components'
import type { Range } from '../stores/useSelectStore'
import { useChartsStore } from '../stores/useChartsStore'
import { ChartsAll } from './chart/ChartsAll'

type Props = {
    setKind: (v: Range) => void
}
const SelectBox = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 8px;
  select {
    width: 133px;
    padding: 10px 16px;
    margin-left: 18px;
    border-radius: 8px;
  }
`
export const Tag: React.FC<Props> = (props) => {
    const { setKind } = props
    const { data } = useChartsStore()
    const isStart = useRef(false)
    if (!(data.line && data.bar && data.pie)) {
        return null
    }
    return (
        <>
            <SelectBox >
                <span>类型</span>
                <div>
                    <select
                        onChange={({ target }) => {
                            if (target.value === '支出') setKind('expenses')
                            if (target.value === '收入') setKind('income')
                        }}>
                        <option>支出</option>
                        <option>收入</option>
                    </select>
                </div>
            </SelectBox>
            <ChartsAll data={data} isStart={isStart.current} />
        </>
    )
}
