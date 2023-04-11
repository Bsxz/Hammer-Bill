import React from 'react'
import styled from 'styled-components'
import { useChartsStore } from '../stores/useChartsStore'
import { BarChart } from './chart/BarChart'
import { LineChart } from './chart/LineChart'
import { PieChart } from './chart/PieChart'

const StyleSpend = styled.div`
  padding: 0 8px;
`
const StyleBar = styled.ol`
  display: flex;
  flex-direction: column;
  row-gap: 8px;

  li {
    display: grid;
    grid-template-areas: 
            'box1 box2 box2'
            'box1 box2 box2';
    grid-template-columns: 48px 1fr 1fr;
    grid-template-rows: repeat(2, 24px);
    column-gap: 8px;

    > div:nth-of-type(1) {
      display: flex;
      grid-area: box1;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      background-color: #EFEFEF;
    }

    > div:nth-of-type(2) {
      display: flex;
      flex-direction: column;
      row-gap: 8px;
      grid-area: box2;
      align-self: center;
      justify-content: space-between;
    }
  }
`
export const SpendingCharts: React.FC = () => {
  const { line, pie, bar } = useChartsStore()
  return (
        <StyleSpend>
            <LineChart data={line} />
            <PieChart data={pie} />
            <StyleBar>
                {bar.map(v => v.amount ? <BarChart key={v.value} data={{ ...v }} /> : null)}
            </StyleBar>
        </StyleSpend>
  )
}
