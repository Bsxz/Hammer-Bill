import React from 'react'
import styled from 'styled-components'

type Props = {
  data: Resources<Item>[] | undefined
  error: any
  isLoading: boolean
  isValidating: boolean
  onLoadMore: () => void
}
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
        font-size: 26px;
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
      line-height: 58px;
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

export const ItemsList: React.FC<Props> = (props) => {
  const { data, error, isLoading, isValidating, onLoadMore } = props

  if (!data) {
    return <>
      {isLoading ? <Div>正在加载</Div> : null}
      {error ? <Div>数据加载出错请重试</Div> : null}
    </>
  }
  else {
    const last = data[data.length - 1]
    const { page, per_page, count } = last.pager
    const hasMore = page * per_page < count
    return (<>
      <Ol>
        {data.map(({ resources }) => {
          return resources.map(item =>
            <li key={item.id}>
              <div>
                {item.tags[0].sign}
              </div>
              <div>
                <p>{item.tags[0].name}</p>
                <p>{item.happen_at}</p>
              </div>
              <span style={{ color: item.kind === 'income' ? '#d8656d' : '#779649' }}>￥{item.amount / 100}</span>
            </li>)
        })}
      </Ol>
      {error ? <Div>数据加载出错请重试</Div> : null}
      {isValidating
        ? <Div>正在加载数据</Div>
        : <Div>{!hasMore
          ? <span>没有更多数据了</span>
          : data[0].resources.length > 0
            ? <button onClick={onLoadMore}>加载更多</button>
            : <span>没有记账</span>}
        </Div>
      }
    </>
    )
  }
}
