import React from 'react'
import styled from 'styled-components'
import { Icon } from './Icon'

interface Props {
  color?: string
}

const Div = styled.header`
  text-align: center;
  margin-top: 50px;
  color: #fff;
`
export const Header: React.FC<Props> = ({ color }) => {
  return (
        <Div style={{ color }}>
            <Icon name="logo" w="5rem" h="5rem" />
            <h2>大锤记账</h2>
        </Div>
  )
}
