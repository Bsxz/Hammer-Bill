import React from 'react'
import styled from 'styled-components'

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
  background-color: #779649;
  margin: 10px;
  border-radius: 8px;

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
const data = [{
  url: 'xxx',
  name: '旅行',
  time: '2021:03:12:18:57',
  amount: 1234
}, {
  url: 'xxx',
  name: '旅行',
  time: '2021:03:12:18:57',
  amount: 1234
}]
export const ItemsList: React.FC = () => {
  return (
        <>
            <Ol>
                {data.map(v => <li key={v.time}>
                    <div>
                        {v.url}
                    </div>
                    <div>
                        <p>{v.name}</p>
                        <p>{v.time}</p>
                    </div>
                    <span>￥{v.amount}</span>
                </li>)}
            </Ol>
            <Div>
                <button>加载更多</button>
            </Div>
        </>
  )
}
