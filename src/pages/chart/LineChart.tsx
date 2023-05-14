import * as echarts from 'echarts'
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import type { Line } from '../../stores/store'

const StyledLine = styled.div`
  height: 180px;
`
export const LineChart: React.FC<ChartProps<Line[]>> = ({ options, data }) => {
    const divRef = useRef<HTMLDivElement>(null)
    const isStart = useRef(true)
    const lineChart = useRef<echarts.ECharts>()
    const [dateList, setDateList] = useState<string[]>([])
    const [valueList, setValueList] = useState<number[]>([])
    useEffect(() => {
        if (!divRef.current)
            return
        if (isStart.current && data) {
            isStart.current = false
            lineChart.current = echarts.init(divRef.current)
            lineChart.current.setOption({
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    }
                },
                grid: { left: 0, top: 16, right: 0, bottom: 30 },
                xAxis: {
                    type: 'category',
                    data: dateList
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
                        data: valueList.map(v => v / 100),
                        type: 'line'
                    }
                ],
                ...options
            })
        }
    }, [])
    useEffect(() => {
        if (data) {
            setDateList(data?.map((item) => (item[0] as string)))
            setValueList(data?.map((item) => (item[1] as number)))
        }
    }, [data])
    useEffect(() => {
        lineChart.current?.setOption({
            xAxis: {
                data: dateList
            },
            series: [
                { data: valueList.map(v => v / 100) },
            ]
        })
    }, [dateList, valueList])
    return (
        <>
            <StyledLine ref={divRef}></StyledLine>
        </>
    )
}
