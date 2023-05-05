import type { Partial } from '@react-spring/web'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { time } from '../lib/time'
import type { Item } from '../stores/useCreateItemStore'
import { useCreateItemStore } from '../stores/useCreateItemStore'
import type { Range, Ranges } from '../stores/useSelectStore'

interface Props {
    select: Range
    tabs: Ranges<Range>
    data?: Partial<Item>
    onClick?: (v: Range) => void
    onChange?: (v: Partial<Item>) => void
}
const Ol = styled.ol`
  display: flex;
  font-size: 1.1rem;
  color: #fff;

  li {
    text-align: center;
    flex-grow: 1;
    padding: 11px 22px;
    border-bottom: 3px solid transparent;
    -webkit-tap-highlight-color: transparent;
  }
`
export const RangePick: React.FC<Props> = ({ tabs, select, data, onChange, onClick }) => {
    const { setData } = useCreateItemStore()
    useEffect(() => {
        setData({
                kind: select,
                tag_ids: [],
                happen_at: time().date,
                amount: 0
            }
        )
    }, [select])
    return (
        <Ol>
            {tabs?.map(k => <li key={k.key}
                                value={select}
                                style={k.key === select ? { borderColor: '#a8bf8f' } : { borderColor: 'transparent' }}
                                onClick={() => onChange?.({ kind: k.key }) || onClick?.(k.key)}>
                {k.text}</li>)}
        </Ol>
    )
}
