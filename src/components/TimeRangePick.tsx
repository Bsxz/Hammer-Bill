import React from 'react'
import styled from 'styled-components'
import type { Selected, TimeRange } from '../stores/useSelectStore'

const Ol = styled.ol`
  display: flex;
  font-size: 1.1rem;
  color: #fff;

  li {
    padding: 16px 22px;
    border-bottom: 3px solid transparent;
    -webkit-tap-highlight-color: transparent;
  }
`
const timeRanges: { key: TimeRange; text: string }[] = [
  { key: 'thisMonth', text: '本月' },
  { key: 'lastMonth', text: '上月' },
  { key: 'thisYear', text: '今年' },
  { key: 'custom', text: '自定义时间' }
]
export const TimeRangePick: React.FC<Selected> = ({ selected, onSelected }) => {
  return (
        <Ol>
            {timeRanges.map(k => <li key={k.key}
                                     style={k.key === selected ? { borderColor: '#a8bf8f' } : { borderColor: 'transparent' }}
                                     onClick={e => onSelected(k.key)}>
                {k.text}</li>)}
        </Ol>
  )
}
