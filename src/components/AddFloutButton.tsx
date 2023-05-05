import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useSelectStore } from '../stores/useSelectStore'
import { Icon } from './Icon'

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
  const nav = useNavigate()
  const { select, onBack } = useSelectStore()
  const add = () => {
    onBack(select)
    nav('/itemspage/new')
  }
  return (
    <>
      <Button onClick={add}>
        <Icon name="add" fill="currentColor" h="50" w="50" />
      </Button>
    </>
  )
}
