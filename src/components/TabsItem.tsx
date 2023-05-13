import type { Partial } from '@react-spring/web'
import type { TouchEvent } from 'react'
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import useSWRInfinite from 'swr/infinite'
import { Link, useNavigate } from 'react-router-dom'
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
        font-size: 26px;
        border-radius: 50%;
        line-height: 48px;
        background-color: #EFEFEF;
        border: 1px solid transparent;
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
  const [isTouch, setTouch] = useState(false)
  const timer = useRef<number>()
  const startPosition = useRef<{ x?: number; y?: number }>({ x: undefined, y: undefined })
  const nav = useNavigate()
  const getTags = (pageIndex: number, prev: Resources<Tag>) => {
    if (prev) {
      const sendCount = prev.pager.page * prev.pager.per_page
      if (sendCount > prev.pager.count)
        return null
    }
    return `/api/v1/tags?page=${pageIndex + 1}&kind=${data.kind}`
  }
  const {
    data: tags,
    size,
    setSize,
    error,
    isValidating
  } = useSWRInfinite(getTags,
    async path => (await get<Resources<Tag>>(path)).data,
    { revalidateFirstPage: false, revalidateAll: true })
  let hasMore
  if (tags && tags[0])
    hasMore = size * tags[0].pager.per_page >= tags[0].pager.count
  const onLoadMore = () => {
    setSize(size + 1)
  }
  const onTouchStart = (e: TouchEvent<HTMLLIElement>, id: Tag['id']) => {
    setTouch(true)
    const { clientX: x, clientY: y } = e.touches[0]
    startPosition.current = { x, y }
    timer.current = window.setTimeout(() => {
      nav(`/tags/${id}`)
    }, 500)
  }
  const onTouchMove = (e: TouchEvent<HTMLLIElement>) => {
    const { clientX, clientY } = e.touches[0]
    const { x, y } = startPosition.current
    if (x === undefined || y === undefined) { return }
    const distance = Math.sqrt((clientX - x) ** 2 + (clientY - y) ** 2)
    if (distance > 10) {
      window.clearTimeout(timer.current)
      timer.current = undefined
    }
  }
  const onTouchEnd = (e: TouchEvent<HTMLLIElement>, id: Tag['id']) => {
    if (timer.current) {
      window.clearTimeout(timer.current)
      timer.current = undefined
    }
    if (!isTouch)
      setSelect(id)
  }
  useEffect(() => {
    setSelect(-1)
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
          tags?.map(({ resources }) => resources.map((v) => {
            return (
              <li key={v.id} onClick={() => {
                setSelect(v.id)
                setData({ tag_ids: [v.id] })
              }}
                onTouchStart={e => onTouchStart(e, v.id)}
                onTouchMove={e => onTouchMove(e)}
                onTouchEnd={e => onTouchEnd(e, v.id)}>
                <span style={{ borderColor: v.id === select ? 'var(--bgcolor1)' : 'transparent' }}>{v.sign}</span>
                <span>{v.name}</span>
              </li>
            )
          }
          ))
        }
      </ol>
      {error ? <div>数据加载出错请重试</div> : null}
      <div>{isValidating
        ? <div>正在加载数据</div>
        : <div>{hasMore
          ? size === 1 ? <span>点击加号，创建新标签</span> : <span>没有更多数据了</span>
          : (tags && tags[0].resources.length > 0)
            ? <button onClick={onLoadMore}>加载更多</button>
            : <span>没有记账</span>}
        </div>
      }</div>
    </Div >
  )
}
