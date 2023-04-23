import * as echarts from 'echarts'
import React, {useEffect, useRef} from 'react'
import styled from 'styled-components'
import type {Line} from '../../stores/store'

const StyledLine = styled.div`
  height: 180px;
`
export const LineChart: React.FC<ChartProps<Line>> = ({options, data}) => {
    const divRef = useRef<HTMLDivElement>(null)
    const isStart = useRef(true)
    useEffect(() => {
        if (!divRef.current) {
            return
        }
        if (isStart.current) {
            isStart.current = false
            const lineChart = echarts.init(divRef.current)
            lineChart.setOption({
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    }
                },
                grid: {left: 0, top: 16, right: 0, bottom: 30},
                xAxis: {
                    type: 'category',
                    data: data.x
                },
                yAxis: {
                    axisLabel: {
                        show: false
                    },
                    splitLine: {
                        show: true
                    }
                },
                series: [
                    {
                        data: data.y.map(v => v / 100),
                        type: 'line'
                    }
                ],
                ...options
            })
        }
    }, [])
    return (
        <>
            <StyledLine ref={divRef}></StyledLine>
        </>
    )
}
