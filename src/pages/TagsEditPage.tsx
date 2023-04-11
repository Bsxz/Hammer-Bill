import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Icon } from '../components/Icon'
import { StyledGradient } from '../components/StyledGradient'
import { TopNav } from '../components/TopNav'
import { useSelectStore } from '../stores/useSelectStore'
import { TagsForm } from './Tags/TagsForm'

const Div = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - var(--vh-offset, 0px));
  overflow: hidden;

  > div:nth-last-child(1) {
    background-color: #E10505;
    margin-top: 16px;
  }
`
const Button = styled.div`
  flex-grow: 0;
  flex-shrink: 0;
  height: 48px;
  border-radius: 8px;
  text-align: center;
  line-height: 48px;
  color: #fff;
  margin: 0 16px;
  background-color: var(--bgcolor2);
`
export const TagsEditPage: React.FC = () => {
  const { backSelect, onChange } = useSelectStore()
  const nav = useNavigate()
  const back = () => {
    onChange(backSelect)
    nav(-1)
  }
  return (
        <Div>
            <StyledGradient>
                <TopNav title="更新标签" icon={
                    <Icon name="back" w="36" h="36" onClick={back} />
                } />
            </StyledGradient>
            <TagsForm text="记账时长按标签，即可再次编辑" btntitle="保存" kind="incomes" />
            <Button>删除</Button>
        </Div>
  )
}
