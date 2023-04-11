import React from 'react'
import styled from 'styled-components'
import type { Bar } from '../../stores/store'

const StyleDiv = styled.div`
  display: flex;
  justify-content: space-between;
`
const BarDiv = styled.div`
  height: 8px;
  background: #CCCCCC;
  width: 100%;
  border-radius: 4px;

  > div {
    height: 8px;
    border-radius: 4px;
    background-color: red;
  }
`
export const BarChart: React.FC<ChartProps<Bar>> = ({ data }) => {
  return (
        <li key={data.value}>
            <div>{data.sign}</div>
            <div>
                <StyleDiv>
                    <div>{data.key}-{data.amount}</div>
                    <div>￥{data.value / 100}</div>
                </StyleDiv>
                <BarDiv>
                    <div style={{ width: data.amount, backgroundColor: data.bgColor }}></div>
                </BarDiv>
            </div>
        </li>
  )
}
