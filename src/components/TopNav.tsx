import React from 'react'
import styled from 'styled-components'
import { useMenuStore } from '../stores/useMenuStore'
import { Icon } from './Icon'

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
  const { visible, setVisible } = useMenuStore()
  return (
        <Div>
            <Icon name="menu" w="50" h="50" x="-10" y="3" onClick={() => setVisible(!visible)} />
            <span>大锤记账</span>
        </Div>
  )
}
