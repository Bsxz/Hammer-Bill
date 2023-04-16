import React from 'react'
import styled from 'styled-components'
import useSWRInfinite from 'swr/infinite'
import {useAjax} from '../../api/ajax'

const Ol = styled.ol`
  li {
    display: flex;
    padding: 9px 22px;
    border-bottom: 1px solid #ccc;

    div {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      margin-left: 14px;

      &:nth-of-type(1) {
        justify-content: center;
        align-items: center;
        width: 58px;
        height: 58px;
        border-radius: 50%;
        background-color: #efefef;
      }

      p:nth-of-type(1) {
        font-weight: 600;
      }

      p:nth-of-type(2) {
        font-weight: 600;
        color: #999999;
      }
    }

    span {
      flex-grow: 1;
      text-align: right;
      color: #7dbd8d;
    }
  }
`
const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  height: 48px;

  button {
    width: 100%;
    height: 48px;
    font-size: 16px;
    color: #fff;
    border-radius: 8px;
    border: none;
    background-color: #779649;
  }
`
const getItem = (pageIndex: number, prev: Resources<Item<Tags>, Pager>) => {
    if (prev) {
        const sendCount = (prev.pager.page + 1) * prev.pager.per_page
        if (sendCount > prev.pager.count)
            return null
    }
    return `/api/v1/item?page=${pageIndex + 1}`
}
export const ItemsList: React.FC = () => {
    const {get} = useAjax()
    const {
        data,
        error,
        size,
        setSize,
        isLoading,
        isValidating
    } = useSWRInfinite(getItem,
        async path => (await get<Resources<Item<Tags>, Pager>>(path)).data,
        {revalidateFirstPage: false})
    const onLoadMore = () => {
        setSize(size + 1)
    }
    if (!data) {
        return <>
            {isLoading ? <Div>正在加载</Div> : null}
            {error ? <Div>数据加载出错请重试</Div> : null}
        </>
    } else {
        let hasMore
        if (data[size - 1])
            hasMore = size * data[size - 1].pager.per_page >= data[size - 1].pager.count
        return (<>
                <Ol>
                    {data.map(({resources}) => {
                        return resources.map(item =>
                            <li key={item.id}>
                                <div>
                                    {item.tags[0].sign}
                                </div>
                                <div>
                                    <p>{item.tags[0].name}</p>
                                    <p>{item.happen_at}</p>
                                </div>
                                <span>￥{item.amount / 100}</span>
                            </li>)
                    })}
                </Ol>
                {error ? <Div>数据加载出错请重试</Div> : null}
                {isValidating
                    ? <Div>正在加载数据</Div>
                    : <Div>{hasMore
                        ? <span>没有更多数据了</span>
                        : <button onClick={onLoadMore}>加载更多</button>}
                    </Div>
                }
            </>
        )
    }
}
