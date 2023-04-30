import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
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
`
export const TagsNewPage: React.FC = () => {
    const [serchParams] = useSearchParams()
    const { backSelect, onChange } = useSelectStore()
    const kind = serchParams.get('kind')
    const nav = useNavigate()
    const back = () => {
        onChange(backSelect)
        nav(-1)
    }
    return (
        <Div>
            <StyledGradient>
                <TopNav title="新建标签" icon={
                    <Icon name="back" w="36" h="36" onClick={back} />
                } />
            </StyledGradient>
            <TagsForm text="记账时长按标签，即可进行编辑" btntitle="创建" kind={kind} />
        </Div>
    )
}
