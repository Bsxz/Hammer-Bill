import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useSWR from 'swr'
import { Icon } from '../components/Icon'
import { RangePick } from '../components/RangePick'
import { StyledGradient } from '../components/StyledGradient'
import { TopNav } from '../components/TopNav'
import type { Range } from '../stores/useSelectStore'
import { useSelectStore } from '../stores/useSelectStore'
import { useAjax } from '../api/ajax'
import { useChartsStore } from '../stores/useChartsStore'
import { time } from '../lib/time'
import { Tag } from './Tag'

type Groups<T> = T[]

type Group = {
  happen_at: string
  amount: number
  tag: null
}
type TagGroup = {
  happen_at: string
  amount: number
  tag: Tag
}
type Ranges = {
  key: Range
  text: string
}
const ranges: Ranges[] = [
  { key: 'thisMonth', text: '本月' },
  { key: 'lastMonth', text: '上月' },
]

export const StatisticalPage: React.FC = () => {
  const { select, onChange } = useSelectStore()
  const { get } = useAjax()
  const [kind, setKind] = useState('expenses')
  const [after, setAfter] = useState(time().firstMonth.format())
  const [before, setBefore] = useState(time().firstDayOfMonth.format())
  const { setData } = useChartsStore()
  const nav = useNavigate()
  const { data: line } = useSWR(
    `/api/v1/items/summary?happened_after=${after}&happened_before=${before}&kind=${kind}&group_by=happen_at`,
    async (path) =>
      (
        await get<{ groups: Groups<Group>; total: number }>(path)
      ).data.groups.map(({ happen_at, amount }) => [happen_at, amount]),
    { refreshInterval: 60000 }
  )
  const { data: bar } = useSWR(
    `/api/v1/items/summary?happened_after=${after}&happened_before=${before}&kind=${kind}&group_by=tag_id`,
    async (path) =>
      (await get<{ groups: Groups<TagGroup>; total: number }>(path)).data,
    { refreshInterval: 60000 }
  )
  useEffect(() => {
    const newLine = Array.from({ length: time().monthAllDay }).map((v, i) => {
      if (line?.find((v) => v[0] === time().dayFormat(i + 1))) {
        return line.filter((v) => v[0] === time().dayFormat(i + 1))[0]
      }
      return [time().dayFormat(i + 1), 0]
    })
    const newBar = bar?.groups?.map(({ tag, amount }) => ({
      name: tag.name,
      sign: tag.sign,
      value: amount,
    }))
    const newPie = bar?.groups?.map(({ tag, amount }) => ({
      name: tag.name,
      value: amount,
    }))
    setData({ line: newLine, bar: newBar, pie: newPie, total: bar?.total })
  }, [line, bar])
  useEffect(() => {
    setAfter(
      select === 'thisMonth' ? time().firstMonth.format() : time().vorvorigenMonat.format()
    )
    setBefore(
      select === 'thisMonth' ? time().firstDayOfMonth.format() : time().firstMonth.format()
    )
  }, [select])
  return (
    <>
      <StyledGradient>
        <TopNav
          title="统计图表"
          icon={
            <Icon name="back" w="42" h="42" y="-4" onClick={() => nav(-1)} />
          }
        />
        <RangePick select={select} onClick={onChange} tabs={ranges} />
      </StyledGradient>
      <Tag setKind={setKind} />
    </>
  )
}
