import React from 'react'
import styled from 'styled-components'
import useSWRInfinite from 'swr/infinite'
import {ajax} from '../../api/ajax'

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
const getItem = (pageIndex: number) => {
    return `/api/v1/item?page=${pageIndex + 1}`
}
export const ItemsList: React.FC = () => {
    const {
        data,
        error
    } = useSWRInfinite(getItem, async path => (await ajax.get<Resources<Item<Tags>, Pager>>(path)).data)
    return (
        <>
            <Ol>
                {data?.map(v => v.resources.map(v => <li key={v.id}>
                        <div>
                            {v.tags[0].sign}
                        </div>
                        <div>
                            <p>{v.tags[0].name}</p>
                            <p>{v.happen_at}</p>
                        </div>
                        <span>￥{v.amount}</span>
                    </li>)
                )}
            </Ol>
            <Div>
                <button>加载更多</button>
            </Div>
        </>
    )
}
