import type { Partial } from '@react-spring/web'
import React, { useEffect, useState } from 'react'

import styled from 'styled-components'
import useSWRInfinite from 'swr/infinite'
import { Link } from 'react-router-dom'
import type { Item } from '../stores/useCreateItemStore'
import { useAjax } from '../api/ajax'
import { Icon } from './Icon'
interface TabItem {
  data: Partial<Item>
  setData: (v: Partial<Item>) => void
}
const Div = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
  text-align: center;
  padding: 12px 20px;
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
  > div {
      height: 48px;
      margin-top: 24px;
      button {
        width: 100%;
        height: 48px;
        font-size: 16px;
        color: #fff;
        border-radius: 8px;
        border: none;
        background-color: #779649;
      }
    }
  .add {
    opacity: 0;
  }
`
export const TabsItem: React.FC<TabItem> = ({ data, setData }) => {
  const { get } = useAjax()
  const [select, setSelect] = useState(-1)
  const getTags = (pageIndex: number, prev: Resources<Tag>) => {
    if (prev) {
      const sendCount = (prev.pager.page + 1) * prev.pager.per_page
      if (sendCount > prev.pager.count)
        return null
    }
    return `/api/v1/tags?page=${pageIndex + 1}&kind=${data.kind}`
  }
  const {
    data: tags,
    error,
    size,
    setSize,
    isValidating
  } = useSWRInfinite(getTags,
    async path => (await get<Resources<Tag>>(path)).data,
    { revalidateFirstPage: false })
  let hasMore
  if (tags && tags[size - 1])
    hasMore = size * tags[size - 1].pager.per_page >= tags[size - 1].pager.count
  const onLoadMore = () => {
    setSize(size + 1)
  }
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
        {tags
          ? tags.map(({ resources }) => {
            return (
              resources.map((v) => {
                return (
                  <li key={v.id} onClick={() => {
                    setData({ tag_ids: [v.id] })
                    setSelect(v.id)
                  }}>
                    <span style={{ border: v.id === select ? '1px solid var(--bgcolor1)' : '' }}>{v.sign}</span>
                    <span>{v.name}</span>
                  </li>
                )
              }
              )
            )
          })
          : null}
      </ol>
      {error ? <div>数据加载出错请重试</div> : null}
      {(isValidating)
        ? <div>正在加载数据</div>
        : <div>{hasMore
          ? <span>没有更多数据了</span>
          : (tags && tags[0].resources.length > 0)
            ? <button onClick={onLoadMore}>加载更多</button>
            : <span>没有记账</span>}
        </div>
      }
    </Div >
  )
}
