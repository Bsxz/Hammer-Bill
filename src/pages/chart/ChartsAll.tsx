import React from 'react'
import styled from 'styled-components'
import {ChartData} from '../../stores/store'
import {BarChart} from './BarChart'
import {LineChart} from './LineChart'
import {PieChart} from './PieChart'

interface Props {
    data: ChartData
    isStart: boolean
}

const StyleSpend = styled.div`
  padding: 0 8px;
`
export const ChartsAll: React.FC<Props> = ({data}) => {
    return (
        <StyleSpend>
            <LineChart data={data.line} />
            <PieChart data={data.pie} />
            <BarChart data={data} />
        </StyleSpend>
    )
}
