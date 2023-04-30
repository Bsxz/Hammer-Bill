import type { Partial } from '@react-spring/web'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import type { Item } from '../stores/useCreateItemStore'
import { useTags } from '../stores/useTags'
import { Icon } from './Icon'

interface TabItem {
  data: Partial<Item>
  setData: (v: Partial<Item>) => void
}
const Div = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
  text-align: center;
  padding: 12px 20px 0;
  overflow: scroll;

  ol {
    display: grid;
    grid-template-columns: repeat(auto-fill, 48px);
    row-gap: 36px;
    column-gap: 32px;
    justify-content: center;

    li {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 80px;
      &:nth-child(1){
        justify-content: start;
      }
      a {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background-color: #EFEFEF;
        padding-top: 8px;
      }
      span:nth-child(1) {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        line-height: 48px;
        background-color: #EFEFEF;
      }
      span:nth-child(2) {
        margin-top: 8px;
        white-space: nowrap;
        color: #666;
      }
    }
  }

  .add {
    opacity: 0;
  }
`
export const TabsItem: React.FC<TabItem> = ({ data, setData }) => {
  const { expensesTags, incomeTags } = useTags()
  const [select, setSelect] = useState(-1)
  const tags = data.kind === 'expenses' ? expensesTags : incomeTags
  useEffect(() => {
    setSelect(-1)
  }, [tags])

  return (
    <Div>
      <ol>
        <li>
          <Link to={`/tags/new?kind=${data.kind}`}><Icon name="add" w="32" h="32"
            fill={'var(--bgcolor1)'} /></Link>
        </li>
        {tags.map((v, i) =>
          <li key={i} onClick={() => {
            setData({ tag_ids: [i] })
            setSelect(i)
          }}>
            <span style={{ border: i === select ? '1px solid var(--bgcolor1)' : '' }}>{v.sign}</span>
            <span>{v.name}</span>
          </li>
        )}
      </ol>
    </Div >
  )
}
