import * as echarts from 'echarts'
import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import type { Pie } from '../../stores/store'
import { useChartsStore } from '../../stores/useChartsStore'

const StylePie = styled.div`
  height: 260px;
`
export const PieChart: React.FC<ChartProps<Pie[]>> = ({ options, data }) => {
  const divRef = useRef<HTMLDivElement>(null)
  const pieChart = useRef<echarts.ECharts>()
  const isStart = useRef(true)
  const { setBarColors } = useChartsStore()
  useEffect(() => {
    if (!divRef.current) return
    if (isStart.current) {
      isStart.current = false
      pieChart.current = echarts.init(divRef.current)
      pieChart.current.setOption({
        tooltip: {
          trigger: 'item',
          formatter: (v: any) => {
            const { data, color } = v
            return `<span style="color:${color} ">${data.name}</span> 
            <span style="margin-left: 50px">￥${data.value}</span>`
          },
        },
        grid: { top: 16, left: 0, right: 0, bottom: 30 },
        series: [
          {
            name: '支出',
            type: 'pie',
            radius: '50%',
            data: data?.map((v) => ({ ...v, value: v.value / 100 })),
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
        ...options,
      })
    }
  }, [])

  useEffect(() => {
    pieChart.current?.setOption({
      series: [
        {
          data: data?.map((v) => ({ ...v, value: v.value / 100 })),
        },
      ],
    })
    const barColors = pieChart.current
      ?.getOption()
      ?.color?.toString()
      .split(',')
      .slice(0, data?.length)
    if (barColors) setBarColors(barColors)
  }, [data])
  return (
    <>
      <StylePie ref={divRef}></StylePie>
    </>
  )
}
