import React, { useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
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
`
const Button = styled.button`
  flex-grow: 0;
  flex-shrink: 0;
  height: 48px;
  border-radius: 8px;
  text-align: center;
  line-height: 48px;
  color: #fff;
  background-color: #e10505;
  margin: 0 16px 24px;
`

export const TagsEditPage: React.FC = () => {
  const { backSelect, onChange } = useSelectStore()
  const { pathname } = useLocation()
  const { Adelete } = useAjax()
  const { data, setData } = useTagFormStore()
  const { get } = useAjax()
  const { id } = useParams()
  useEffect(() => {
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
  const confirmable = (fn: () => void) => {
    const result = window.confirm(`确实要删除${data.name}标签吗?`)
    if (result)
      fn()
  }
  const onDelete = () => {
    confirmable(() => Adelete(`/api/v1${pathname}`)
      .then(() => {
        window.alert('删除成功')
        nav(-1)
      })
      .catch((error) => {
        window.alert('删除失败')
        throw new Error(error)
      }))
  }
  return (
    <Div>
      <StyledGradient>
        <TopNav title="更新标签" icon={
          <Icon name="back" w="36" h="36" onClick={back} />
        } />
      </StyledGradient>
      <TagsForm text="记账时长按标签，即可再次编辑" btntitle="保存" kind="income" />
      <Button onClick={onDelete}>删除</ Button>
    </Div>
  )
}
