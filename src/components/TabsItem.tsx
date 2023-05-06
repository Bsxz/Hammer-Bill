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
    /* grid-template-columns: repeat(auto-fill, auto); */
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
  const [page, setPage] = useState(1)
  const [select, setSelect] = useState(-1)
  const [_tags, setTags] = useState<Tag[]>([])
  const getTags = (pageIndex: number, prev: Resources<Tag>) => {
    if (prev) {
      const sendCount = (prev.pager.page + 1) * prev.pager.per_page
      if (sendCount > prev.pager.count)
        return null
    }
    return `/api/v1/tags?page=${page}&kind=${data.kind}`
  }
  const {
    data: tags,
    error,
    isValidating
  } = useSWRInfinite(getTags,
    async path => (await get<Resources<Tag>>(path)).data,
    { revalidateFirstPage: false })
  let hasMore
  if (tags && tags[0])
    hasMore = page * tags[0].pager.per_page >= tags[0].pager.count

  const onLoadMore = () => {
    setPage(page + 1)
  }

  useEffect(() => {
    setSelect(-1)
    if (tags)
      setTags(state => state.concat(tags?.[0].resources))
  }, [tags])
  return (
    <Div>
      <ol style={{ gridTemplateColumns: (tags?.[0].resources.length) ? 'repeat(auto-fill, 48px)' : 'repeat(auto-fill, auto)' }}>
        <li>
          <Link to={`/tags/new?kind=${data.kind}`}><Icon name="add" w="32" h="32"
            fill={'var(--bgcolor1)'} /></Link>
          <span>创建</span>
        </li>
        {
          _tags.map((v) => {
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
        }
      </ol>
      {error ? <div>数据加载出错请重试</div> : null}
      <div>{!hasMore
        ? (isValidating)
          ? <div>正在加载数据</div>
          : <button onClick={onLoadMore}>加载更多</button>
        : page === 1 ? <span>点击加号，创建新标签</span> : <span>没有更多数据了</span>
      }</div>
    </Div >
  )
}
