import type { SpringValue } from '@react-spring/web'
import { animated } from '@react-spring/web'
import type { FormEventHandler } from 'react'
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { Time, time } from '../lib/time'
import { useCreateItemStore } from '../stores/useCreateItemStore'
import { Column } from './Column'

interface Props {
  popupStyles: { translateY: SpringValue<string> }
  onMaskVisible: () => void
}
const ColumnBox = styled(animated.form)`
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 0;
  height: 40vh;
  width: 100%;
  z-index: 256;
  background-color: #fff;
  overflow: hidden;
  touch-action: none;


  > div {
    display: flex;
    flex: 1;
    width: 100%;
    height: 36px;
    border: 1px solid #eee;
    overflow: hidden;

    &:nth-last-child(1) {
      position: absolute;
      justify-content: right;
      column-gap: 20px;
      right: 20px;
      bottom: 20px;
      border: none;

      button {
        width: 88px;
        height: 46px;
      }
    }

    > ol {
      flex: 1;
      height: 36px;

      > li {
        height: 36px;
        line-height: 36px;
        text-align: center;
      }
    }
  }
`
export const TimeColumn: React.FC<Props> = ({ popupStyles, onMaskVisible }) => {
  const { data, setData } = useCreateItemStore()
  const timevalue = useRef(time(data.happen_at))
  const [_year, setYear] = useState(timevalue.current.year)
  const [_month, setMonth] = useState(timevalue.current.month)
  const [_day, setDay] = useState(timevalue.current.day)
  const lastDayOfMonth = (year: number, month: number) => {
    return new Time(new Date(year, month - 1 + 1, 0))
  }
  const year = useRef(Array.from({ length: time().year }).map((v, i) => i + 1).filter(v => v >= 1970).reverse())
  const month = useRef(Array.from({ length: 12 }).map((v, i) => i + 1))
  const day = Array.from({ length: lastDayOfMonth(_year, _month).day }).map((v, i) => i + 1)

  useEffect(() => {
    timevalue.current.year = _year
    timevalue.current.day = _day
    timevalue.current.month = _month
    if (_day > day.length)
      setDay(day.length)
  }, [_year, _month, _day])
  const submit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setData({ happen_at: timevalue.current.date })
    onMaskVisible()
  }

  return (
    <ColumnBox style={{ ...popupStyles }} onSubmit={submit}>
      <Column data={year.current} value={_year} onChange={setYear} />
      <Column data={month.current} value={_month} onChange={setMonth} />
      <Column data={day} value={_day} onChange={setDay} />
      <div>
        <button type="button" onClick={onMaskVisible}>取消</button>
        <button type="submit">确定</button>
      </div>
    </ColumnBox>
  )
}
