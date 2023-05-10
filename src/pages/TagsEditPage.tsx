import React, { useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Icon } from '../components/Icon'
import { StyledGradient } from '../components/StyledGradient'
import { TopNav } from '../components/TopNav'
import { useSelectStore } from '../stores/useSelectStore'
import { useAjax } from '../api/ajax'
import { useTagFormStore } from '../stores/useTagFormStore'
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
  const start = useRef(true)
  const { setData } = useTagFormStore()
  const { get } = useAjax()
  const { id } = useParams()
  useEffect(() => {
    if (start.current) {
      start.current = false
      return
    }
    get<Resource<Tag>>(`/api/v1/tags/${id}`).then((response) => {
      const { name, kind, sign } = response.data.resource
      setData({ name, kind, sign })
    })
  }, [id])
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
