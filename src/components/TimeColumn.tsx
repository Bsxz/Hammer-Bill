import {animated, SpringValue} from '@react-spring/web'
import React, {useEffect, useRef, useState} from 'react'
import styled from 'styled-components'
import {Time} from '../lib/time'
import {useCreateItemStore} from '../stores/useCreateItemStore'
import {Column} from './Column'

type Props = {
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
export const TimeColumn: React.FC<Props> = ({popupStyles, onMaskVisible}) => {
    const {setData} = useCreateItemStore()
    const timevalue = useRef(new Time())
    const [_year, setYear] = useState(timevalue.current.year)
    const [_month, setMonth] = useState(timevalue.current.month)
    const [_day, setDay] = useState(timevalue.current.day)
    const lastDayOfMonth = (year: number, month: number) => {
        return new Time(new Date(year, month - 1 + 1, 0))
    }
    const year = Array.from({length: timevalue.current.year}).map((v, i) => i + 1).filter(v => v >= 1970).reverse()
    const month = Array.from({length: 12}).map((v, i) => i + 1)
    const day = Array.from({length: lastDayOfMonth(_year, _month).day}).map((v, i) => i + 1)
    useEffect(() => {
        timevalue.current.year = _year
        timevalue.current.day = _day
    }, [_year, _day])
    useEffect(() => {
        timevalue.current.month = _month
        setDay(1)
    }, [_month])
    useEffect(() => {
        setData({happen_at: timevalue.current.date})
    }, [])
    const submit = () => {
        setData({happen_at: timevalue.current.date})
    }
    return (
        <ColumnBox style={{...popupStyles}} onSubmit={submit}>
            <Column data={year} value={_year} onChange={setYear} />
            <Column data={month} value={_month} onChange={setMonth} />
            <Column data={day} value={_day} onChange={setDay} />
            <div>
                <button type="button" onClick={onMaskVisible}>取消</button>
                <button type="submit" onClick={onMaskVisible}>确定</button>
            </div>
        </ColumnBox>
    )
}
