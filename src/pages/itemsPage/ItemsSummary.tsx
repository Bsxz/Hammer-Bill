import React from 'react'
import styled from 'styled-components'

type Props = {
  data: {
    income: number
    expenses: number
    balance: number
  } | undefined
  error: any
  isLoading: boolean
}
const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  height: 48px;
`
const Ol = styled.ol`
  font-size: 1.1rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 65px;
  margin: 16px;
  border-radius: 8px;
  background-color: #252a43;

  li {
    color: #fff;
    text-align: center;

    &:nth-of-type(1) {
      color: #d8656d;
    }

    &:nth-of-type(2) {
      color: #4a8f60;
    }
  }
`
export const ItemsSummary: React.FC<Props> = (props) => {
  const { data, error, isLoading } = props
  if (!data) {
    return <>
      {isLoading ? <Div>正在加载</Div> : null}
      {error ? <Div>数据加载出错请重试</Div> : null}
    </>
  }
  else {
    return (
      <Ol>
        <li>
          <div>收入</div>
          <div>￥{data && data.income / 100}</div>
        </li>
        <li>
          <div>支出</div>
          <div>￥{data && data.expenses / 100}</div>
        </li>
        <li>
          <div>净收入</div>
          <div>￥{data && data.balance / 100}</div>
        </li>
      </Ol>
    )
  }
}
