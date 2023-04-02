import React from 'react'
import styled from 'styled-components'
import {Icon} from './Icon'

const Div = styled.div`
  display: flex;
  align-items: center;
  color: #fff;
  padding: 40px 0 0 22px;

  span {
    font-size: 24px;
    font-weight: 100;
    margin-left: 10px;
  }
`
export const TopNav: React.FC = () => {
    return (
        <Div>
            <Icon name="menu" w="50" h="50" x="-10" y="3" />
            <span>大锤记账</span>
        </Div>
    )
}
