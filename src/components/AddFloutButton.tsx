import React from 'react'
import styled from 'styled-components'
import {Icon} from './Icon'

const Button = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 56px;
  height: 56px;
  right: 16px;
  bottom: 16px;
  padding: 14px;
  border-radius: 50%;
  background-color: #779649;
  color: #fff;
`
export const AddFloutButton: React.FC = () => {
    return (
        <>
            <Button>
                <Icon name="add" fill="currentColor" h="50" w="50" />
            </Button>
        </>
    )
}
