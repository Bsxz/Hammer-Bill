import React from 'react'
import {useNavigate} from 'react-router-dom'
import styled from 'styled-components'
import {StyledGradient} from './StyledGradient'

type Props = {
    visible: boolean
    toggle: () => void
    handler: () => void
}
const Div = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 321px;
  background-color: #fff;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.16);
  z-index: 512;

  > div:nth-of-type(1) {
    padding: 19px 0 15px 16px;
    color: #fff;
  }

  .content {
    padding: 18px 16px 12px;

    > div {
      margin-top: 61px;
      text-align: right;

      span {
        margin-left: 32px;
      }
    }
  }
`
export const MessageBox: React.FC<Props> = ({visible, handler, toggle}) => {
    const nav = useNavigate()
    const lotOut = () => {
        nav(0)
        handler()
    }
    return (
        <Div style={{visibility: visible ? 'visible' : 'hidden'}}>
            <StyledGradient>
                请确认
            </StyledGradient>
            <div className="content">
                <span>确定要退出吗?</span>
                <div>
                    <span onClick={toggle}>取消</span>
                    <span onClick={lotOut}>退出登录</span>
                </div>
            </div>
        </Div>
    )
}
