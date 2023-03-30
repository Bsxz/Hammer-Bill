import React from 'react'
import styled from 'styled-components'
import { Icon } from './Icon'
const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  svg {
    animation: loading 1.4s infinite linear;
  }

  div {
    margin-top: 60px;
    position: relative;
    p {
      font-size: 16px;
      &::after {
        content: '';
        display: inline-block;
        width: 76px;
        height: 26px;
        position: absolute;
        z-index: 1;
        top: 0;
        left: 0;
        background-color: #fff;
        animation: hidden 1.4s infinite linear;
      }
    }
  }

  @keyframes hidden {
    from {
      transform: translateX(0);
    }

    to {
      transform: translateX(100%);
    }
  }
  @keyframes loading {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }
`
export const Loading: React.FC = () => {
  return (
    <>
      <Div>
        <Icon name="loading" w="100" h="100" />
        <div>
          <p>加载中···</p>
        </div>
      </Div>
    </>
  )
}
