import React from 'react'
import styled from 'styled-components'

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
export const ItemsSummary: React.FC = () => {
  return (
        <Ol>
            <li>
                <div>收入</div>
                <div>128</div>
            </li>
            <li>
                <div>支出</div>
                <div>100</div>
            </li>
            <li>
                <div>净收入</div>
                <div>28</div>
            </li>
        </Ol>
  )
}
