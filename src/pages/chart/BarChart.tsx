import React from 'react'
import styled from 'styled-components'
import {ChartData} from '../../stores/store'
import {useChartsStore} from '../../stores/useChartsStore'

interface Props {
    data: ChartData
}

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
export const BarChart: React.FC<Props> = ({data}) => {
    const {barColors} = useChartsStore()
    const amount = data.bar.map(v => v.value).reduce((v, result) => v + result, 0)
    const barAmounts = data.bar.map(({value}) => `${((value / amount) * 100).toFixed(0)}%`)
    const newBar = data.bar.map((v, i) => ({...v, amount: barAmounts[i], bgColor: barColors[i]}))
    return (
        <StyleBar>
            {newBar.map(v => <li key={v.value}>
                <div>{v.sign}</div>
                <div>
                    <StyleDiv>
                        <div>{v.key}-{v.amount}</div>
                        <div>￥{v.value / 100}</div>
                    </StyleDiv>
                    <BarDiv>
                        <div style={{width: v.amount, backgroundColor: v.bgColor}}></div>
                    </BarDiv>
                </div>
            </li>)}
        </StyleBar>
    )
}
