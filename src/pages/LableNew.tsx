import React from 'react'
import {useNavigate} from 'react-router-dom'
import styled from 'styled-components'
import {Icon} from '../components/Icon'
import {StyledGradient} from '../components/StyledGradient'
import {TopNav} from '../components/TopNav'
import {LableLayout} from '../layouts/LableLayout'
import {useSelectStore} from '../stores/useSelectStore'

const Div = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - var(--vh-offset, 0px));
  overflow: hidden;
`
const Button = styled.div`
  flex-grow: 0;
  flex-shrink: 0;
  height: 48px;
  margin: 0 16px 66px;
  border-radius: 8px;
  text-align: center;
  line-height: 48px;
  color: #fff;
  background-color: var(--bgcolor2);
`
export const LableNew: React.FC = () => {
    const {select, backSelect, onChange} = useSelectStore()
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
            <LableLayout text="记账时长按标签，即可进行编辑" />
            <Button>确定</Button>
        </Div>
    )
}
