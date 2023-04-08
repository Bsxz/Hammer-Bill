import React from 'react'
import {useNavigate} from 'react-router-dom'
import styled from 'styled-components'
import {Icon} from '../components/Icon'
import {StyledGradient} from '../components/StyledGradient'
import {TopNav} from '../components/TopNav'
import {LableLayout} from '../layouts/LableLayout'
import {useSelectStore} from '../stores/useSelectStore'

const Div = styled.div`
  height: 100vh;
`
export const LableUpdate: React.FC = () => {
    const {select, backSelect, onChange} = useSelectStore()
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
            <LableLayout />
        </Div>
    )
}
