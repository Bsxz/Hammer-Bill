import React from 'react'
import styled from 'styled-components'
import {usePopupStore} from '../stores/usePopupStore'
import {StyledGradient} from './StyledGradient'

const Div = styled.div`
  position: absolute;
  height: 40vh;
  width: 90vw;
  left: 50%;
  top: 40%;
  transform: translateX(-50%);
  box-shadow: 0 1px 1px 1px #ccc;
  background-color: #fff;
  font-size: 18px;

  div {
    display: flex;
    padding: 16px;


    input {
      height: 48px;
      margin-top: 10px;
      border-radius: 8px;
      padding-left: 16px;
      font-size: inherit;
    }

    &:nth-of-type(1) {
      height: 52px;
      line-height: 52px;
      padding: 0 0 0 16px;
    }

    &:nth-of-type(2), &:nth-of-type(3) {
      flex-direction: column;
    }

    &:nth-last-child(1) {
      column-gap: 32px;
      justify-content: right;
    }
  }

`
export const Popup: React.FC = () => {
    const {setVisible} = usePopupStore()
    return (
        <Div>
            <StyledGradient>
                请选择时间
            </StyledGradient>
            <div>
                <span>开始时间</span>
                <input type="text" placeholder="2020-01-01" />
            </div>
            <div>
                <span>结束时间</span>
                <input type="text" placeholder="2020-01-01" />
            </div>
            <div>
                <span onClick={() => setVisible(false)}>取消</span>
                <span>确定</span>
            </div>
        </Div>
    )
}
